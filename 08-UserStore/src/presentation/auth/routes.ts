import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService, EmailService } from '../services';
import { envs } from '../../config';



export class AuthRoutes {


  static get routes(): Router {

    const router = Router();

    const emailService = new EmailService(
      envs.MAILER_SERVICE,
      envs.MAILER_EMAIL,
      envs.MAILER_SECRET_KEY
    );
    const authService = new AuthService(emailService);

    const constroller = new AuthController(authService);

    // Definir las rutas
    router.post('/login', constroller.loginUser);
    router.post('/register', constroller.registerUser);

    router.get('/validate-email/:token', constroller.validateEmail);


    return router;
  }


}