import sequelize from '.';

const syncDB = async () => {
	await sequelize.sync({ force: true });
	return { message: 'All models were synchronized successfully.' };
};

const dropAllTables = async () => {
	await sequelize.drop();
	return { message: 'All models were deleted successfully.' };
};

syncDB();
