import fs from 'fs';
import { ServerApp } from './server-app'
import { CreateTable } from '../domain/use-cases/create-table.use-case';
import { SaveFile } from '../domain/use-cases/save-file.use-case';

describe('test for server-app', () => {


    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        name: 'test-filename',
        destination: 'test-destination',
    };


    afterEach(() => {
        if (fs.existsSync('test-destination')) {
            fs.rmSync('test-destination', { recursive: true, force: true });
        }
    });


    test('should create ServerApp instance', () => {
        const serverApp = new ServerApp();
        expect(serverApp).toBeInstanceOf(ServerApp);
        expect(typeof ServerApp.run).toBe('function')

    });


    test('should run ServerApp with options', () => {


        const logSpy = jest.spyOn(console, 'log');
        const createTableSpy = jest.spyOn(CreateTable.prototype, 'execute');
        const saveFileSpy = jest.spyOn(SaveFile.prototype, 'execute');

        ServerApp.run(options);

        expect(logSpy).toHaveBeenCalledTimes(1);
        // expect(logSpy).toHaveBeenCalledWith('server is running');
        // expect(logSpy).toHaveBeenLastCalledWith('File created');


        expect(createTableSpy).toHaveBeenCalledTimes(1);
        expect(createTableSpy).toHaveBeenCalledWith({
            base: options.base, limit: options.limit
        });
        expect(saveFileSpy).toHaveBeenCalledTimes(1);
        expect(saveFileSpy).toHaveBeenCalledWith({
            fileContent: expect.any(String),
            fileDestination: options.destination,
            fileName: options.name
        });

    });


    test('should run with custom values mocked', () => {

        const logMock = jest.fn();
        const logMockError = jest.fn();
        const createMock = jest.fn().mockReturnValue('1 x 2 = 2');
        const saveFileMock = jest.fn();

        console.log = logMock;
        console.error = logMockError;
        CreateTable.prototype.execute = createMock;
        SaveFile.prototype.execute = saveFileMock;

        ServerApp.run(options);


        expect(createMock).toHaveBeenCalledWith({ "base": options.base, "limit": options.limit });
        expect(saveFileMock).toHaveBeenCalledWith({
            "fileContent": "1 x 2 = 2",
            "fileDestination": "test-destination",
            "fileName": "test-filename"
        });

    })


})