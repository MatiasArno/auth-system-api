import { Router } from 'express';
import UserController from '../controllers/user';
import wrongMethodHandler from '../middlewares/wrong-method';
import validatePasswords from '../middlewares/user-credentials-validator';

const userRouter = Router();

userRouter.get('/me', UserController.getPersonalInfo);
userRouter.patch('/me', validatePasswords, UserController.changePassword);

userRouter.all('/me', wrongMethodHandler);

export default userRouter;
