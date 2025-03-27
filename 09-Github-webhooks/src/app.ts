import express from 'express';
import { envs } from './config/envs';
import { GithubController } from './presentation/github/controller';
import { GithubSha256Middleware } from './presentation/middlewares/github-sha256.middleware';


(() => {
    main();
})();



function main() {

    const app = express();

    app.use(express.json());


    const githubController = new GithubController();
    app.post(
        '/api/github',
        GithubSha256Middleware.verifyGithubSignature,
        githubController.webhookHandler
    );



    app.listen(envs.PORT);

}