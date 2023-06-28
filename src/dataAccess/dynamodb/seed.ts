import {
  CreateTableCommand,
  DescribeTableCommand,
} from '@aws-sdk/client-dynamodb';
import { logger } from '../../utils';
import { client, tables } from './dynamoDb';

const doesTableExist = async () => {
  try {
    await client.send(new DescribeTableCommand({ TableName: tables.users }));
    return true; // Table exists
  } catch (error: any) {
    if (error.name === 'ResourceNotFoundException') return false;
    logger.error(error);
    throw error as Error;
  }
};

const seedDynamoDb = async (): Promise<void> => {
  logger.debug(`Creating table '${tables.users}'`);

  const tableExists = await doesTableExist();
  if (tableExists) {
    logger.debug(`Table "${tables.users}" already exists.`);
    return;
  }

  const command = new CreateTableCommand({
    TableName: tables.users,
    AttributeDefinitions: [{ AttributeName: 'userId', AttributeType: 'S' }],
    KeySchema: [{ AttributeName: 'userId', KeyType: 'HASH' }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  });

  try {
    await client.send(command);
    logger.debug(`Table '${tables.users}' created successfully!`);
  } catch (error) {
    logger.error(
      `Error creating table '${tables.users}':`,
      JSON.stringify(error),
    );
    throw error;
  }
};

export default seedDynamoDb;
