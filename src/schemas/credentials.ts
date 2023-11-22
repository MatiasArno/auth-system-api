import { z } from 'zod';

const UserCredentials = z.object({
	oldPassword: z
		.string({
			required_error: 'Password is required',
			invalid_type_error: 'Must be a string with at least 8 characters',
		})
		.min(8),
	newPassword: z
		.string({
			required_error: 'Password is required',
			invalid_type_error: 'Must be a string with at least 8 characters',
		})
		.min(8),
});

const validateUserCredentials = (userData: any) => UserCredentials.safeParse(userData);

export default validateUserCredentials;
