import { LogEntity, LogSeverityLevel } from "../entities/log.entity"
import { LogDataSource } from "./log.datasource"


describe('log.datasource.ts', () => {

    const newLog = new LogEntity({
        message: 'testing log.datasource.ts',
        origin: 'log.datasource.test.ts',
        level: LogSeverityLevel.low
    })
    class MockLogDatasource implements LogDataSource {
        async saveLog(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }
    }


    test('should test the abstract class', async () => {

        const mockLogDatasource = new MockLogDatasource();

        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);

        expect(mockLogDatasource).toHaveProperty('saveLog');
        expect(typeof mockLogDatasource.saveLog).toBe('function');
        expect(typeof mockLogDatasource.getLogs).toBe('function');

        await mockLogDatasource.saveLog(newLog);

        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.high);

        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);

    });

})

