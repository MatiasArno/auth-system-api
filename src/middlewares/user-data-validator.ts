import { Request, Response, NextFunction } from 'express';
import validateUserData from '../schemas/user';
import getSHA512FromString from '../utils/password-hasher';

const validateData = (req: Request, res: Response, next: NextFunction) => {
	const validatedData = validateUserData(req.body);

	if (!validatedData.success) return res.status(400).json(validatedData);

	const { email, username, password } = validatedData.data;
	const hashedPassword = getSHA512FromString(password);

	res.locals.userData = { email, username, hashedPassword };

	return next();
};

export default validateData;
