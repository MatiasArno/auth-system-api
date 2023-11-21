import sequelize, { Model, DataTypes } from './database';
const { STRING, INTEGER } = DataTypes;

class Auth extends Model {
	static async createNew(userData: any) {
		const { userID, hashedPassword } = userData;

		const [auth, isAuthCreated] = await Auth.findOrCreate({
			where: { user_id: userID },
			defaults: {
				password: hashedPassword,
				user_id: userID,
			},
		});

		return { auth, isAuthCreated };
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
