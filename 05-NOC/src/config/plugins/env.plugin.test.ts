import { envs } from "./env.plugin"

describe('envs plugin.ts', () => {

    // console.log(envs);

    test('should return env options', () => {

        expect(envs).toEqual({
            PORT: 3000,
            MAILER_EMAIL: 'test@gmail.com',
            MAILER_SERVICE: 'test',
            MAILER_SECRET_KEY: 'test',
            PROD: false,
            MONGO_URL: 'mongodb://localhost:27017',
            MONGO_DB_NAME: 'NOC-TEST',
            MONGO_USER: 'alan',
            MONGO_PASS: '123456789'
        });

    });


    test('should return error if not found env', async () => {

        jest.resetModules();
        process.env.PORT = 'ABC';


        try {

            await import('./env.plugin');

            expect(true).toBe(false);

        } catch (error) {

            expect(`${error}`).toContain('"PORT" should be a valid integer')

        }
    })


})