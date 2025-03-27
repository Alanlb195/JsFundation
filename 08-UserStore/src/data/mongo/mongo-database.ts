import mongoose from "mongoose";


interface Options {
    url: string,
    dbName: string,
}

export class MongoDatabase {
    static async connect(options: Options) {
        const { dbName, url } = options;

        try {
            await mongoose.connect(
                url,
                {
                    dbName: dbName
                }
            )
            return true;
        } catch (error) {
            console.log('Mongo connection error.')
            throw error;
        }
    }
    static async disconnect() {
        await mongoose.disconnect();
    }
}