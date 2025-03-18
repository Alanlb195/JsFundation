import { Server } from "./presentation/server";
import 'dotenv/config'
import { envs } from './config/plugins/env.plugin'


(async () => {
    main();
})();



function main() {
    Server.start();
    // console.log({email: process.env.MAILER_EMAIL})
    // console.log({secret: process.env.MAILER_SECRET_KEY})
    // console.log({port: envs.PORT})
    // console.log(process.env.PROD)
}
