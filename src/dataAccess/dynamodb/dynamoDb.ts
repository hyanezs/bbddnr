import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { logger } from '../../utils';
import seedDynamoDb from './seed';

const production = process.env.NODE_ENV === 'production';

const config = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  endpoint: production ? undefined : process.env.DYNAMODB_ENDPOINT,
  region: process.env.AWS_REGION,
};

let client: DynamoDBClient;
let docClient: DynamoDBDocumentClient;

const initDynamoDb = async () => {
  try {
    logger.info('Trying to connect to dynamo db.');
    client = new DynamoDBClient(config);
    docClient = DynamoDBDocumentClient.from(client);
    await seedDynamoDb();
    logger.info('Connection to dynamo db has been established successfully.');
    return true;
  } catch (error) {
    logger.error('Unable to connect to dynamo db:', error);
    throw error;
  }
};

const tables = {
  users: 'users',
};

export { client, docClient, initDynamoDb, tables };
