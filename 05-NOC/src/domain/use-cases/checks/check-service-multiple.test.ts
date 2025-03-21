import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";

describe('check-service-multiple.ts', () => {
    const mockRepo1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const mockRepo2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn()
    }
    const successCallback = jest.fn();
    const errorCallback = jest.fn();

    const checkMultipleService = new CheckServiceMultiple(
        [mockRepo1, mockRepo2],
        successCallback,
        errorCallback
    );

    beforeEach(() => {
        jest.clearAllMocks();
    });


    test('should call successCallback when fetch returns true', async() => {
        const wasOk = await checkMultipleService.execute('https://google.com')

        expect(wasOk).toBe(true);
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();


        expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));

    });

    test('should return errorCallback when fetch returns false', async () => {

        const wasOk = await checkMultipleService.execute('https://googlezzz.com')

        expect(wasOk).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();

        expect(mockRepo1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRepo2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));


    });

});
