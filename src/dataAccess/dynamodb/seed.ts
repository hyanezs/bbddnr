import {
  CreateTableCommand,
  DescribeTableCommand,
  type CreateTableCommandInput,
} from '@aws-sdk/client-dynamodb';
import { tables } from '../../types/constants';
import { logger } from '../../utils';
import { client } from './dynamoDb';

const doesTableExist = async (name: string) => {
  try {
    logger.debug('checking if exists');
    await client.send(new DescribeTableCommand({ TableName: name }));
    return true;
  } catch (error: any) {
    if (error.name === 'ResourceNotFoundException') return false;
    logger.error(error);
    throw error as Error;
  }
};

const createTable = async (name: string, table: CreateTableCommandInput) => {
  try {
    logger.debug(`Creating table '${name}'`);

    const exists = await doesTableExist(name);
    if (exists) {
      logger.debug(`Table '${name}' already exists!`);
      return;
    }

    logger.debug('does not exist. creating it now');

    const command = new CreateTableCommand(table);

    await client.send(command);
    logger.debug(`Table '${name}' created successfully!`);
  } catch (error) {
    logger.error(`Error creating table '${name}':`, JSON.stringify(error));
    throw error;
  }
};

const seedDynamoDb = async (): Promise<void> => {
  await createTable(tables.users, {
    TableName: tables.users,
    AttributeDefinitions: [
      { AttributeName: 'userId', AttributeType: 'S' },
      { AttributeName: 'email', AttributeType: 'S' },
      { AttributeName: 'username', AttributeType: 'S' },
    ],
    KeySchema: [{ AttributeName: 'userId', KeyType: 'HASH' }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
    GlobalSecondaryIndexes: [
      {
        IndexName: 'EmailIndex',
        KeySchema: [
          { AttributeName: 'email', KeyType: 'HASH' },
          { AttributeName: 'userId', KeyType: 'RANGE' },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 10,
          WriteCapacityUnits: 10,
        },
      },
      {
        IndexName: 'UsernameIndex',
        KeySchema: [
          { AttributeName: 'username', KeyType: 'HASH' },
          { AttributeName: 'userId', KeyType: 'RANGE' },
        ],
        Projection: {
          ProjectionType: 'ALL',
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 10,
          WriteCapacityUnits: 10,
        },
      },
    ],
  });

  await createTable(tables.userSettings, {
    TableName: tables.userSettings,
    AttributeDefinitions: [{ AttributeName: 'userId', AttributeType: 'S' }],
    KeySchema: [{ AttributeName: 'userId', KeyType: 'HASH' }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  });
};

export default seedDynamoDb;
