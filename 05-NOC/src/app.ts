import { envs } from "./config/plugins/env.plugin";
import { LogModel, MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";
import 'dotenv/config'

(async () => {
    main();
})();

async function main() {

    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
        user: envs.MONGO_USER,
        pass: envs.MONGO_PASS
    });


    // Create a log document - MongoDB
    // const newLog = await LogModel.create({
    //     message: 'Test message desde mongo',
    //     origin: 'app.ts',
    //     level: 'high'
    // });
    // await newLog.save();
    // console.log(newLog);


    Server.start();
}
