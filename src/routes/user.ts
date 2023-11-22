import { Router } from 'express';
import UserController from '../controllers/user';
import tryCatch from '../middlewares/try-catch';
import wrongMethodHandler from '../middlewares/wrong-method';
import wrongURIHandler from '../middlewares/wrong-uri';
import authorizeUser from '../middlewares/token-validator';

const userRouter = Router();

// PUBLIC
userRouter.post('/auth', tryCatch(UserController.register));
userRouter.post('/auth/token', tryCatch(UserController.login));

//PRIVATE
userRouter.get('/me', authorizeUser, UserController.getPersonalInfo);
userRouter.patch('/me', authorizeUser, UserController.changePassword);

userRouter.all('/', wrongMethodHandler);
userRouter.all('/*', wrongURIHandler);

export default userRouter;
