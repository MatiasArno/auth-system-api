import { Request, Response } from 'express';
import User from '../models/user';
import Auth from '../models/auth';
import { getToken } from '../utils/token-manager';

abstract class UserController {
	static async register(req: Request, res: Response) {
		const { username, email, hashedPassword } = res.locals.userData;

		const newUser = await User.register({ username, email });

		const userID = newUser.user.get('id');
		await Auth.createNew({ userID, hashedPassword });

		return res.status(201).json({ user: username, id: userID });
	}

	static async login(req: Request, res: Response) {
		const { username, hashedPassword } = res.locals.userData;

		const userFound = await User.findByUsername(username);
		if (!userFound)
			return res.status(404).json({ error: 'User is not registered' });

		const userID = (userFound as any).id;
		const userAuth = await Auth.searchByPrimaryKey(userID);
		const storedHashedPassword = (userAuth as any).password;

		if (hashedPassword === storedHashedPassword) {
			const token = getToken({ userID, username });
			return res.status(201).json({ token });
		}

		return res.status(400).json({ error: 'Wrong credentials' });
	}

	static async getPersonalInfo(req: Request, res: Response) {
		const { userID } = res.locals.userData;
		const loggedUser = await User.findByPrimaryKey(userID);
		const { id, username, email } = loggedUser as any;

		return res.json({ id, username, email });
	}

	static async changePassword(req: Request, res: Response) {
		const { userID, oldHashedPassword, newHashedPassword } =
			res.locals.userData;

		const oldStoredHashedPassword = (
			(await Auth.searchByPrimaryKey(userID)) as any
		).password;

		if (oldHashedPassword === oldStoredHashedPassword) {
			await Auth.updatePassword({
				pk: userID,
				newPassword: newHashedPassword,
			});

			return res
				.status(200)
				.json({ message: 'Password changed successfully' });
		}

		return res.status(400).json({ error: 'Old password is wrong' });
	}
}

export default UserController;
