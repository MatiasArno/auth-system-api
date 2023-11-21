import sequelize, { Model, DataTypes } from './database';
import AppError from '../utils/app-error';
const { STRING, INTEGER } = DataTypes;

class User extends Model {
	static async createNew(userData: any) {
		const { email, username } = userData;

		try {
			const [user, isUserCreated] = await User.findOrCreate({
				where: { username },
				defaults: {
					username,
					email,
				},
			});

			return { user, isUserCreated };
		} catch (error) {
			const { type, message } = (error as any).errors[0];

			throw new AppError(type, message, 400);
		}
	}
}

User.init(
	{
		id: {
			primaryKey: true,
			allowNull: false,
			type: INTEGER,
			autoIncrement: true,
		},
		username: {
			type: STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: STRING,
			allowNull: false,
			unique: true,
		},
	},
	{
		sequelize,
		modelName: 'User',
		tableName: 'Users',
	}
);

export default User;
