import express, { type Request, type Response } from 'express';
import winston from 'winston';
import publicRoutes from './controllers/publicRoutes';
import { errorHandler, httpLogger } from './middlewares';
import logger, { consoleLoggerFormat } from './utils/logger';

const port = process.env.SERVER_PORT ?? 5000;

const app = express();
const startDate = new Date();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(httpLogger);
app.use(publicRoutes);

app.use(errorHandler);

app.get('/', (_req: Request, res: Response) => {
  res.send('BBDD API');
});

async function initServer(): Promise<void> {
  app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
  });
}

logger.add(
  new winston.transports.Console({
    format: consoleLoggerFormat,
    level: 'debug',
  }),
);

export { app, initServer, startDate };
