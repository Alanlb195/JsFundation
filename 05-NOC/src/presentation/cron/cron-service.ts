import { CronJob } from 'cron';


type CronTime = string | Date;
type OnTick = () => void;


export class CronService {


    static createJob( cronTime: CronTime, onTick: OnTick ): CronJob {

        const job = new CronJob(
            // '*/3 * * * * *', // cronTime
            cronTime,
            // function () {
            //     const date = new Date();
            //     console.log('3 seconds', date);
            // }, // onTick
            onTick,
            null, // onComplete
            true, // start
            'America/Los_Angeles' // timeZone
        );

        job.start();


        return job;

    }

}