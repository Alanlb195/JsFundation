import fs from 'fs';
import { SaveFile } from './save-file.use-case';

describe('SaveFile', () => {
    let saveFile: SaveFile;
    let options: { fileContent: string; fileDestination: string; fileName: string };
    let filePath: string;


    // Arrange - variables and objects to use, delete testingFolder folder if exists
    beforeEach(() => {
        jest.clearAllMocks();
        saveFile = new SaveFile();
        options = {
            fileContent: 'test-content',
            fileDestination: 'testingFolder',
            fileName: 'test-table'
        };
        filePath = `${options.fileDestination}/${options.fileName}.txt`;

        // if (fs.existsSync(options.fileDestination)) {
        //     fs.rmSync(options.fileDestination, { recursive: true, force: true });
        // }
    });

    // Delete the folder of the test after it ends
    afterEach(() => {
        // For the first test - remove dir
        if (fs.existsSync(options.fileDestination)) {
            fs.rmSync(options.fileDestination, { recursive: true, force: true });
        }
        // for the second test - remove custom dir
        if (fs.existsSync('custom-table-folder')) {
            fs.rmSync('custom-table-folder', { recursive: true, force: true });
        }
        // for the second test - remove custom dir
        if (fs.existsSync('Test-FileDestination')) {
            fs.rmSync('Test-FileDestination', { recursive: true, force: true });
        }
    });

    // Act
    test('save file should save with default values', () => {
        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        // Assert
        expect(result).toBeTruthy();
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    });

    test('save file should save with custom values', () => {
        // Custom Arrange for this test
        options = {
            fileContent: 'custom content',
            fileDestination: 'custom-table-folder',
            fileName: 'custom-table-file'
        };
        filePath = `${options.fileDestination}/${options.fileName}.txt`;

        // Act
        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        // Assert
        expect(result).toBe(true);
        expect(fileExists).toBe(true);
        expect(fileContent).toBe(options.fileContent);
    });


    test('should return false if directory could not be created', () => {

        const saveFile = new SaveFile();
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing'); }
        );

        const result = saveFile.execute(options)

        expect(result).toBe(false);

        jest.restoreAllMocks();

    });

    test('should return false if file could not be created', () => {

        const saveFile = new SaveFile();

        const mkdirSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {
            throw new Error('Simulated file system error');
        });

        const result = saveFile.execute({ fileContent: 'Test-Content', fileDestination: 'Test-FileDestination', fileName: 'Test-FileName' })

        expect(result).toBe(false);

        jest.restoreAllMocks();

    })

});
