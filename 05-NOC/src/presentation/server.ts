import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDataSource } from '../infrastructure/data-sources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service'



const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
)


export class Server {


    static start() {

        console.log('Server started...')


        // Send email...

        CronService.createJob('*/3 * * * * *', () => {
            // const url = 'https://google.com';
            const url = 'http://localhost:3000/posts';
            new CheckService(
                fileSystemLogRepository,
                undefined,
                undefined
                // () => console.log(`${url} is ok`),
                // (error) => console.log(error)
            ).execute(url);
        });




    }



}