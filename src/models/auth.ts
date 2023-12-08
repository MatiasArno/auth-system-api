import sequelize, { Model, DataTypes } from './database/connection';
const { STRING, INTEGER } = DataTypes;

class Auth extends Model {
	static async createNew(userData: any) {
		const { userID, hashedPassword } = userData;

		const [auth, isAuthCreated] = await this.findOrCreate({
			where: { user_id: userID },
			defaults: {
				password: hashedPassword,
				user_id: userID,
			},
		});

		return { auth, isAuthCreated };
	}

	static async searchByPrimaryKey(pk: string) {
		return this.findByPk(pk);
	}

	static async updatePassword(userData: any) {
		const { pk, newPassword } = userData;
		return this.update(
			{ password: newPassword },
			{ where: { user_id: pk } }
		);
	}
}

Auth.init(
	{
		password: {
			type: STRING,
			allowNull: false,
		},
		user_id: {
			type: INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'Auth',
		tableName: 'Auths',
	}
);

export default Auth;
