import { Router } from 'express';
import UserController from '../controllers/user';
import tryCatch from '../middlewares/try-catch';
import wrongMethodHandler from '../middlewares/wrong-method';
import wrongURIHandler from '../middlewares/wrong-uri';
import validateData from '../middlewares/user-data-validator';
import validatePartialData from '../middlewares/user-partial-data-validator';

const authRouter = Router();

authRouter.post('/', validateData, tryCatch(UserController.register));
authRouter.post('/token', validatePartialData, tryCatch(UserController.login));

authRouter.all('/', wrongMethodHandler);
authRouter.all('/token', wrongMethodHandler);
authRouter.all('/*', wrongURIHandler);

export default authRouter;
