interface UserData {
	username: string;
	password: string;
}

interface UserCredentials {
	oldPassword: string;
	newPassword: string;
}

export { UserData, UserCredentials };
