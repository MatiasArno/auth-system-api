const ENVIRONMENT = process.env.ENVIRONMENT;

const PORT = Number(process.env.PORT) || 63001;

const POSTGRES_URL = process.env.POSTGRES_URL || '';

const SECRET_KEY = process.env.SECRET_KEY || '';

const isDevelopmentEnvironment = ENVIRONMENT === 'development';
const areEnvironmentVariablesSetted = POSTGRES_URL != '' && SECRET_KEY != '';

if (!areEnvironmentVariablesSetted) {
	console.log('Environment variables are not setted properly');
	process.exit();
}

export {
	PORT,
	ENVIRONMENT,
	POSTGRES_URL,
	SECRET_KEY,
	isDevelopmentEnvironment,
	areEnvironmentVariablesSetted,
};
