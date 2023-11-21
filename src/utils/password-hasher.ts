import { createHash } from 'node:crypto';

const getSHA512FromString = (password: string) =>
	createHash('sha512').update(password).digest('hex');

export default getSHA512FromString;
