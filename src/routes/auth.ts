import { Router } from 'express';
import UserController from '../controllers/user';
import tryCatch from '../middlewares/try-catch';
import wrongMethodHandler from '../middlewares/wrong-method';
import validateData from '../middlewares/user-data-validator';
import validatePartialData from '../middlewares/user-partial-data-validator';

const authRouter = Router();

authRouter.post('/', validateData, tryCatch(UserController.register));
authRouter.post('/token', validatePartialData, tryCatch(UserController.login));

authRouter.all('/', wrongMethodHandler);
authRouter.all('/token', wrongMethodHandler);

export default authRouter;
