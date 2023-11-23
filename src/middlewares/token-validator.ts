import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/token-manager';
import AppError from '../utils/app-error';

const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
	const { authorization } = req.headers;
	if (!authorization)
		return res.status(401).json({ error: 'Nothing to do over here...' });

	const token = authorization.split(' ')[1];

	try {
		const userData = verifyToken(token);
		res.locals.userData = userData;
		return next();
	} catch (error) {
		throw new AppError('Wrong token', 'Nothing to do over here...', 401);
	}
};

export default authorizeUser;
