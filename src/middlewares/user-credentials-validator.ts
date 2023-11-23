import { Request, Response, NextFunction } from 'express';
import validateUserCredentials from '../schemas/credentials';
import getSHA512FromString from '../utils/password-hasher';
import { UserCredentials } from '../controllers/user.types';

const validatePasswords = (req: Request, res: Response, next: NextFunction) => {
	const { userID } = res.locals.userData;
	const validatedData = validateUserCredentials(req.body);
	if (!validatedData.success) return res.status(400).json(validatedData);

	const { oldPassword, newPassword } = validatedData.data as UserCredentials;
	const oldHashedPassword = getSHA512FromString(oldPassword);
	const newHashedPassword = getSHA512FromString(newPassword);

	res.locals.userData = { userID, oldHashedPassword, newHashedPassword };

	return next();
};

export default validatePasswords;
