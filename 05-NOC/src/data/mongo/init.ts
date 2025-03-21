import mongoose from "mongoose";


interface ConnectionOptions {
    mongoUrl: string,
    dbName: string,
    user: string,
    pass: string,
}


export class MongoDatabase {


    static async connect(options: ConnectionOptions) {

        const { dbName, mongoUrl, user, pass } = options;


        try {

            await mongoose.connect(mongoUrl, {
                dbName,
                pass,
                user
            });
            // console.log('Mongo connected');
            return true;
        }
        catch (error) {
            // console.log('Mongo connection error');
            throw error;
        }
    }

}

