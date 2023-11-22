import { z } from 'zod';

const User = z.object({
	username: z
		.string({
			required_error: 'Username is required',
			invalid_type_error: 'Username must be a string',
		})
		.min(4),
	email: z
		.string({
			required_error: 'Email is required',
		})
		.email(),
	password: z
		.string({
			required_error: 'Password is required',
			invalid_type_error: 'Must be a string with at least 8 characters',
		})
		.min(8),
});

const validateUser = (userData: any) => User.safeParse(userData);

export default validateUser;
