import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDataSource } from '../infrastructure/data-sources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service'
import { EmailService } from './email/email.service';



const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
)
const emailService = new EmailService();


export class Server {


    static start() {

        console.log('Server started...')

        // send email
        new SendEmailLogs(
            emailService,
            fileSystemLogRepository
        ).execute(
            ['alanlb196@gmail.com', 'teyvexpone@gmail.com']
        )

        // Save logs  - monitoring job every 3 seconds
        CronService.createJob('*/3 * * * * *', () => {
            const url = 'http://localhost:3000/posts';
            new CheckService(
                fileSystemLogRepository,
                undefined,
                undefined,
            ).execute(url);
        });
    }
}