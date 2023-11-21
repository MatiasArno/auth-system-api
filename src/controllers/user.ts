import { Request, Response } from 'express';
import User from '../models/user';
import Auth from '../models/auth';
import getSHA512FromString from '../utils/password-hasher';

abstract class UserController {
	static async createNew(req: Request, res: Response) {
		// VALIDAR DATA CON ZOD
		const { email, username, password } = req.body;
		const hashedPassword = getSHA512FromString(password);

		const newUser = await User.createNew({ username, email });

		const userID = newUser.user.get('id');
		const newAuth = await Auth.createNew({ userID, hashedPassword });

		// ELIMINAR
		console.log({
			userCreated: newUser.isUserCreated,
			authCreated: newAuth.isAuthCreated,
		});

		return res.status(201).json({ user: newUser.user, auth: newAuth.auth });
	}
}

export default UserController;
