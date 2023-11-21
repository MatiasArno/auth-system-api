import { Router } from 'express';
import tryCatch from '../middlewares/try-catch';
import wrongMethodHandler from '../middlewares/wrong-method';
import wrongURIHandler from '../middlewares/wrong-uri';
import UserController from '../controllers/user';

const userRouter = Router();

userRouter.put('/auth', tryCatch(UserController.createNew));

// userRouter.get('/', );
// userRouter.put('/', );
// userRouter.patch('/', );
// userRouter.delete('/', );

userRouter.all('/', wrongMethodHandler);
userRouter.all('/*', wrongURIHandler);

export default userRouter;
