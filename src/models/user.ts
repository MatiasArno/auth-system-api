import sequelize, { Model, DataTypes } from './database';
import AppError from '../utils/app-error';
const { STRING, INTEGER } = DataTypes;

class User extends Model {
	static async register(userData: any) {
		const { email, username } = userData;

		try {
			const [user, wasUserCreated] = await this.findOrCreate({
				where: { username },
				defaults: {
					username,
					email,
				},
			});

			return { user, wasUserCreated };
		} catch (error) {
			const { type, message } = (error as any).errors[0];
			throw new AppError(type, message, 400);
		}
	}

	static async findByUsername(username: string) {
		return this.findOne({ where: { username } });
	}
	
	static async findByPrimaryKey(pk: string) {
		return this.findByPk(pk);
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
