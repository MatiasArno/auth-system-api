import { Request, Response } from 'express';

const wrongMethodHandler = (req: Request, res: Response) =>
	res.status(405).json({ message: 'Method not allowed' });

export default wrongMethodHandler;
