import { Router } from 'express';
import tryCatch from '../middlewares/try-catch';
import wrongMethodHandler from '../middlewares/wrong-method';
import wrongURIHandler from '../middlewares/wrong-uri';
import UserController from '../controllers/user';

const userRouter = Router();

userRouter.post('/auth', tryCatch(UserController.createNew));
userRouter.post('/auth/token', tryCatch(UserController.login));

userRouter.all('/', wrongMethodHandler);
userRouter.all('/*', wrongURIHandler);

export default userRouter;
