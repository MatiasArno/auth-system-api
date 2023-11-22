import { Request, Response } from 'express';
import User from '../models/user';
import Auth from '../models/auth';
import getSHA512FromString from '../utils/password-hasher';
import validateUser from '../schemas/user';

abstract class UserController {
	static async createNew(req: Request, res: Response) {
		const validatedData = validateUser(req.body);

		if (!validatedData.success) return res.status(400).json(validatedData);

		const { email, username, password } = validatedData.data;
		const hashedPassword = getSHA512FromString(password);

		const newUser = await User.createNew({ username, email });

		const userID = newUser.user.get('id');
		const newAuth = await Auth.createNew({ userID, hashedPassword });

		return res.status(201).json({ user: newUser.user, auth: newAuth.auth });
	}

	static async login(req: Request, res: Response) {
		const { username, password } = req.body;

		const userFound = await User.findByUsername(username);
		if (!userFound)
			return res.status(400).json({ error: 'User is not registered' });

		const userID = (userFound as any).id;
		const userAuth = (await Auth.findByPk(userID)) as any;
		const hashedPassword = userAuth.password;

		return res.json(hashedPassword);
	}
}

export default UserController;
