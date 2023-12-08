import express, { json } from 'express';
import helmet from 'helmet';
import mainRouter from './routes';
import errorHandlder from './middlewares/error-handler';
import wrongURIHandler from './middlewares/wrong-uri';

// import './models/database/sync-db';

const app = express();

app.use(json());
app.use(helmet());

app.use('/v1/api', mainRouter);

app.all('/*', wrongURIHandler);

app.use(errorHandlder);

export default app;
