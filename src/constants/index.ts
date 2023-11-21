const ENVIRONMENT = process.env.ENVIRONMENT;

const PORT = process.env.PORT || 45009;

const POSTGRES_URL = process.env.POSTGRESQL_URL || '';

const isDevelopmentEnvironment = ENVIRONMENT === 'development';

export { PORT, ENVIRONMENT, POSTGRES_URL, isDevelopmentEnvironment };
