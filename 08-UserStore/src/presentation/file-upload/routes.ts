import { Router } from 'express';
import { FileUploadController } from './controller';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { TypeMiddleware } from '../middlewares/type.middleware';


export class FileUploadRoutes {
    static get routes(): Router {

        const router = Router();
        const fileUploadService = new FileUploadService();
        const controller = new FileUploadController(fileUploadService);


        router.use(FileUploadMiddleware.containFiles);
        // router.use(TypeMiddleware.validTypes(['users', 'products', 'categories']));

        // Definir las rutas
        // api/upload/single/<user|category|product>/
        router.post('/single/:type', controller.uploadFile);
        router.post('/multiple/:type', TypeMiddleware.validTypes(['users', 'products', 'categories']), controller.uploadMultipleFiles);

        return router;
    }
}