import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/app-error';

const errorHandlder = (
	error: any,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	if (error instanceof AppError) {
		return res
			.status(error.statusCode)
			.json({ type: error.errorType, message: error.message });
	}

	console.log(error);

	return res
		.status(500)
		.json({ message: 'Something went wrong with the server' });
};

export default errorHandlder;
