import { Router } from 'express';
import ServerController from '../controllers/server';
import userRouter from '../routes/user';
import authRouter from './auth';
import authorizeUser from '../middlewares/token-validator';

const mainRouter = Router();

mainRouter.get('/status', ServerController.getStatus);
mainRouter.use('/auth', authRouter);
mainRouter.use('/users', authorizeUser, userRouter);

export default mainRouter;
