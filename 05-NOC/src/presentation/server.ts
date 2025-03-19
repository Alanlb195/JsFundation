import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infrastructure/data-sources/file-system.datasource';
import { MongoLogDatasource } from '../infrastructure/data-sources/mongo-log.datasource';
import { PostgresLogDatasource } from '../infrastructure/data-sources/postgres-log-datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service'
// import { EmailService } from './email/email.service';



const logRepository = new LogRepositoryImpl(
    // new FileSystemDataSource()
    // new MongoLogDatasource(),
    new PostgresLogDatasource(),
)

const mongoRepository = new LogRepositoryImpl(new MongoLogDatasource);
const postgresRepository = new LogRepositoryImpl(new PostgresLogDatasource);
const fileSystemRepository = new LogRepositoryImpl(new FileSystemDataSource);

// const emailService = new EmailService();

export class Server {


    public static async start() {

        console.log('Server started...');


        // to get logs from mongo
        // const logs = await logRepository.getLogs(LogSeverityLevel.high);
        // console.log(logs);

        // send email
        // new SendEmailLogs(
        //     emailService,
        //     logRepository
        // ).execute(
        //     ['alanlb196@gmail.com', 'teyvexpone@gmail.com']
        // )

        // Save logs  - monitoring job every 3 seconds
        CronService.createJob('*/5 * * * * *', () => {
            // const url = 'http://localhost:3000/posts';
            const url = 'http://googleasd.com';
            new CheckServiceMultiple(
                [mongoRepository, postgresRepository, fileSystemRepository],
                () => console.log(`${url} is okey`),
                (error) => console.log(error),
            ).execute(url);
        });
    }
}