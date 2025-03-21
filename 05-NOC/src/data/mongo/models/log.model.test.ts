import mongoose from "mongoose";
import { MongoDatabase } from "../init";
import { LogModel } from "./log.model";

describe('log.model.test.ts', () => {

    beforeAll(async () => {
        await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!,
            pass: process.env.MONGO_PASS!,
            user: process.env.MONGO_USER!
        });
    })

    afterAll(async () => {
        await mongoose.disconnect();
    });

    test('should return LogModel', async () => {

        const logData = {
            message: 'test-message',
            origin: 'log.model.test.ts',
            level: 'low',
        }

        const log = await LogModel.create(logData);
        // console.log(log)

        expect(log).toEqual(expect.objectContaining({
            ...logData,
            createdAt: expect.any(Date),
            id: expect.any(String)
        }));

        await LogModel.findByIdAndDelete(log.id);

    });


    test('should return a schema object', () => {

        const schema = LogModel.schema.obj;
        // console.log(schema);

        expect(schema).toEqual(expect.objectContaining({
            message: { type: expect.any(Function), required: true },
            origin: { type: expect.any(Function) },
            level: {
                type: expect.any(Function),
                enum: ['low', 'medium', 'high'],
                default: 'low'
            },
            createdAt: expect.any(Object)

        }))
    })

});

