import * as dotenv from 'dotenv';
dotenv.config();

import { initDynamoDb } from './src/dataAccess/dynamodb/dynamoDb';
import { initElasticSearch } from './src/dataAccess/elasticsearch/elasticsearch';
import { initServer } from './src/server';
import { logger } from './src/utils';

(async () => {
  try {
    await initDynamoDb();
    await initElasticSearch();
    await initServer();
  } catch (err: any) {
    logger.error(`Error initializing server: ${String(err)}`);
    process.exit(1);
  }
})();
