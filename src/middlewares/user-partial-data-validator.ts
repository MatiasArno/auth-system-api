import { Request, Response, NextFunction } from 'express';
import { validatePartialUserData } from '../schemas/user';
import { UserData } from '../controllers/user.types';
import getSHA512FromString from '../utils/password-hasher';

const validatePartialData = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const validatedData = validatePartialUserData(req.body);
	if (!validatedData.success) return res.status(400).json(validatedData);

	const { username, password } = validatedData.data as UserData;
	const hashedPassword = getSHA512FromString(password);

	res.locals.userData = { username, hashedPassword };

	return next();
};

export default validatePartialData;
