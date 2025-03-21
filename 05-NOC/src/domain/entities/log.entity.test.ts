import { LogEntity, LogSeverityLevel } from "./log.entity";

describe('log.entity.ts', () => {
    
    const dataObj = {
        level: LogSeverityLevel.low,
        message: 'testing',
        origin: 'log.entity.test.ts'
    }

    test('should create a LogEntity instance', () => {

        const log = new LogEntity(dataObj)


        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);

    });

    test('should create a LogEntity to json', () => {
        const jsonLog = `{"message":"Error: Email log not sent","origin":"send-email-logs.ts","level":"high","createdAt":"2025-03-18T19:48:02.588Z"}`
        const log = LogEntity.fromJson(jsonLog);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe('Error: Email log not sent');
        expect(log.level).toBe('high');
        expect(log.origin).toBe('send-email-logs.ts');
        expect(log.createdAt).toBeInstanceOf(Date);
    });
    
    test('should create a LogEntity instance from object', () => {


        const log = LogEntity.fromObject(dataObj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toBe(dataObj.message);
        expect(log.level).toBe(dataObj.level);
        expect(log.origin).toBe(dataObj.origin);
        expect(log.createdAt).toBeInstanceOf(Date);
        

    })

})