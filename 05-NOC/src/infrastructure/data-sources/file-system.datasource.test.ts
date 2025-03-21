import fs from 'fs';
import path from 'path';
import { FileSystemDataSource } from './file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

describe('file-system.datasource.ts', () => {


    const logPath = path.join(__dirname, '../../../logs')

    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true })
    });

    test('should create log files if they do not exists', () => {

        new FileSystemDataSource();
        const files = fs.readdirSync(logPath);
        expect(files).toEqual(['logs-high.log', 'logs-low.log', 'logs-medium.log']);

    });


    test('should save a log in logs-all.log', () => {

        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.low,
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));
    });


    test('should save a log in logs-all.log and logs-medium.log', () => {

        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.medium,
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));
    });


    test('should save a log in logs-all.log and logs-high.log', () => {

        const logDatasource = new FileSystemDataSource();
        const log = new LogEntity({
            message: 'test',
            level: LogSeverityLevel.high,
            origin: 'file-system.datasource.test.ts'
        });

        logDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));
        expect(highLogs).toContain(JSON.stringify(log));
    });


    test('should return all logs', async () => {

        const logDatasource = new FileSystemDataSource();

        const logLow = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'test',
            origin: 'low'
        });
        const logMedium = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'test',
            origin: 'medium'
        });
        const logHigh = new LogEntity({
            level: LogSeverityLevel.high,
            message: 'test',
            origin: 'high'
        });

        await logDatasource.saveLog(logLow);
        await logDatasource.saveLog(logMedium);
        await logDatasource.saveLog(logHigh);

        const logsLow = await logDatasource.getLogs(LogSeverityLevel.low);
        const logsMedium = await logDatasource.getLogs(LogSeverityLevel.medium);
        const logsHigh = await logDatasource.getLogs(LogSeverityLevel.high);

        expect(logsLow).toEqual(expect.arrayContaining([logLow, logMedium, logHigh]));
        expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
        expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));
    });


    test('should not throw an error if path exists', () => {
        new FileSystemDataSource();
        new FileSystemDataSource();
        expect(true).toBeTruthy();
    });


    test('should throw an error if severity level is not defined', async () => {
        const logDatasource = new FileSystemDataSource();

        const customSeverityLevel = 'UNDEFINED_LEVEL' as LogSeverityLevel;

        try {
            await logDatasource.getLogs(customSeverityLevel);
            expect(true).toBeFalsy();
        }
        catch(error) {
            const errorString = `${error}`;
            // console.log(errorString);

            expect(errorString).toContain(`Error: ${customSeverityLevel} not implemented.`);
        }
    })

})

