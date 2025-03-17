
const runCommand = async (args: string[]) => {

    process.argv = [...process.argv.slice(0, 2), ...args];
    const { yarg } = await import('./args.plugin');
    return yarg;
}

describe('Test args.plugin.ts', () => {
    const originalArgv = process.argv;

    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    })


    test('should return default values', async () => {
        const argv = await runCommand(['-b', '5']);

        // console.log( process.argv )
        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'table',
            d: './outputs',
        }));
    });


    test('should return configuration with custom values', async () => {
        const argv = await runCommand(['-b', '9', '-l', '7', '-s', 'true', '-n', 'test-table', '-d', './testdir-output']);


        // console.log( process.argv )
        expect(argv).toEqual(expect.objectContaining({
            b: 9,
            l: 7,
            s: true,
            n: 'test-table',
            d: './testdir-output',
        }));
    })


})