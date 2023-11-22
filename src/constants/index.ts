const ENVIRONMENT = process.env.ENVIRONMENT;

const PORT = Number(process.env.PORT) || 45009;

const POSTGRES_URL = process.env.POSTGRES_URL || '';

const SECRET_KEY = process.env.SECRET_KEY || '';

const isDevelopmentEnvironment = ENVIRONMENT === 'development';

export { PORT, ENVIRONMENT, POSTGRES_URL, SECRET_KEY, isDevelopmentEnvironment };
