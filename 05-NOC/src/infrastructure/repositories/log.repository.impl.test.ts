import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.impl";

describe('log.repository.impl.ts', () => {

    const mockLogDatasource = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
    }

    const logRepository = new LogRepositoryImpl(mockLogDatasource);


    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('save log should call logDataSource with arguments', async () => {

        const log = { level: LogSeverityLevel.low, message: 'hola', origin: 'hola' } as LogEntity;
        await logRepository.saveLog(log);

        expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);

    });


    test('save log should call logDataSource with arguments', async () => {

        const lowSeverity = LogSeverityLevel.low;

        await logRepository.getLogs(lowSeverity);
        expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(lowSeverity);


    });
});

