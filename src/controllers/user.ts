import { Request, Response } from 'express';
import { UserData, UserCredentials } from './user.types';
import validateUserData, { validatePartialUserData } from '../schemas/user';
import validateUserCredentials from '../schemas/credentials';
import User from '../models/user';
import Auth from '../models/auth';
import getSHA512FromString from '../utils/password-hasher';
import { getToken } from '../utils/token-generator';

abstract class UserController {
	static async register(req: Request, res: Response) {
		const validatedData = validateUserData(req.body);

		if (!validatedData.success) return res.status(400).json(validatedData);

		const { email, username, password } = validatedData.data;
		const hashedPassword = getSHA512FromString(password);

		const newUser = await User.register({ username, email });

		const userID = newUser.user.get('id');
		await Auth.createNew({ userID, hashedPassword });

		return res.status(201).json({ user: username, id: userID });
	}

	static async login(req: Request, res: Response) {
		const validatedData = validatePartialUserData(req.body);
		if (!validatedData.success) return res.status(400).json(validatedData);

		const { username, password } = validatedData.data as UserData;

		const userFound = await User.findByUsername(username);
		if (!userFound)
			return res.status(400).json({ error: 'User is not registered' });

		const userID = (userFound as any).id;
		const userAuth = (await Auth.searchByPrimaryKey(userID)) as any;
		const storedHashedPassword = userAuth.password;
		const hashedPassword = getSHA512FromString(password);

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
		const { userID } = res.locals.userData;
		const validatedData = validateUserCredentials(req.body);
		if (!validatedData.success) return res.status(400).json(validatedData);

		const { oldPassword, newPassword } =
			validatedData.data as UserCredentials;
		const oldHashedPassword = getSHA512FromString(oldPassword);
		const hashedPassword = getSHA512FromString(newPassword);

		const oldStoredHashedPassword = (
			(await Auth.searchByPrimaryKey(userID)) as any
		).password;

		if (oldHashedPassword === oldStoredHashedPassword) {
			await Auth.updatePassword({
				pk: userID,
				newPassword: hashedPassword,
			});

			return res
				.status(200)
				.json({ message: 'Password changed successfully' });
		}

		return res.status(400).json({ error: 'Old password is wrong' });
	}
}

export default UserController;
