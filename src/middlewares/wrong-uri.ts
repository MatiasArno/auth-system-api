import { Request, Response } from 'express';

const wrongURIHandler = (req: Request, res: Response) =>
	res.status(404).json({ message: 'Requested resource not found' });

export default wrongURIHandler;
