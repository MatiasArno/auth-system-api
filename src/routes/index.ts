import { Router } from 'express';
import ServerController from '../controllers/server';
import UserRouter from '../routes/user';
import wrongURIHandler from '../middlewares/wrong-uri';

const mainRouter = Router();

mainRouter.get('/status', ServerController.getStatus);
mainRouter.use('/users', UserRouter);

mainRouter.all('/*', wrongURIHandler);

export default mainRouter;
