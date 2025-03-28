import { CronService } from "./cron-service"

describe('cron-service.test.ts', () => {

    const mockTick = jest.fn();

    test('should create a job', (done) => {
        const job = CronService.createJob('* * * * * *', mockTick);

        setTimeout(() => {
            expect(mockTick).toHaveBeenCalledTimes(3);
            job.stop();
            done();
        }, 3000);
    });

})