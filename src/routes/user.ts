import { Router } from 'express';
import UserController from '../controllers/user';
import tryCatch from '../middlewares/try-catch';
import wrongMethodHandler from '../middlewares/wrong-method';
import wrongURIHandler from '../middlewares/wrong-uri';
import authorizeUser from '../middlewares/token-validator';
import validateData from '../middlewares/user-data-validator';
import validatePartialData from '../middlewares/user-partial-data-validator';
import validatePasswords from '../middlewares/user-credentials-validator';

const userRouter = Router();

// PUBLIC
userRouter.post('/auth', validateData, tryCatch(UserController.register));
userRouter.post(
	'/auth/token',
	validatePartialData,
	tryCatch(UserController.login)
);

//PRIVATE
userRouter.get('/me', authorizeUser, UserController.getPersonalInfo);
userRouter.patch(
	'/me',
	authorizeUser,
	validatePasswords,
	UserController.changePassword
);

userRouter.all('/auth', wrongMethodHandler);
userRouter.all('/auth/token', wrongMethodHandler);
userRouter.all('/me', wrongMethodHandler);
userRouter.all('/*', wrongURIHandler);

export default userRouter;
