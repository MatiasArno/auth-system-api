import { Request, Response } from 'express';
import * as pkg from '../../package.json';
import testDBConnection from '../models/database';

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
