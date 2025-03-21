import mongoose from "mongoose";
import { MongoDatabase } from "./init"

describe('init MongoDB', () => {

    afterAll(async () => {
        await mongoose.disconnect();
    });

    test('should connect to MongoDB', async () => {

        const connected = await MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: process.env.MONGO_URL!,
            pass: process.env.MONGO_PASS!,
            user: process.env.MONGO_USER!
        });

        expect(connected).toBe(true);

    });

    test('should throw an error if connection string is wrong', async () => {

        await expect(MongoDatabase.connect({
            dbName: process.env.MONGO_DB_NAME!,
            mongoUrl: 'mongodb://localhostzzzzz:27017', // URL inválida
            pass: process.env.MONGO_PASS!,
            user: process.env.MONGO_USER!
        })).rejects.toThrow();
        
    });


})

