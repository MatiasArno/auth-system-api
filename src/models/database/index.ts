import sequelize from './connection';

const testDBConnection = async () => {
	try {
		await sequelize.authenticate();
		return { message: 'Connection has been established successfully.' };
	} catch (error) {
		return { message: 'Unable to connect to the database:', error };
	}
};

export default testDBConnection;
