import { Request, Response } from 'express';
import * as pkg from '../../package.json';
import sequelize from '../models/database';

const testDBConnection = async () => {
	try {
		await sequelize.authenticate();
		return { message: 'Connection has been established successfully.' };
	} catch (error) {
		return { message: 'Unable to connect to the database:', error };
	}
};

abstract class ServerController {
	static async getStatus(req: Request, res: Response) {
		const dbStatus = await testDBConnection();

		const serverStatus = {
			server: 'Running',
			version: pkg.version,
			author: pkg.author,
			database: dbStatus,
		};

		return res.status(200).json(serverStatus);
	}
}

export default ServerController;
