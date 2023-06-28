import { QueryCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { tables } from '../../types/constants';
import { type User } from '../../types/models';
import { logger } from '../../utils';
import { docClient } from '../dynamodb/dynamoDb';

const getUserByEmail = async (email: string) => {
  const emailCheckParams = new QueryCommand({
    KeyConditionExpression: `email = :email`,
    ExpressionAttributeValues: {
      ':email': { S: email },
    },
    TableName: tables.users,
    IndexName: 'EmailIndex',
  });

  console.log({ emailCheckParams });

  return docClient.send(emailCheckParams);
};

const persistUser = async (params: User) => {
  const userCommand = new PutCommand({
    TableName: tables.users,
    Item: { ...params, settings: undefined },
  });

  const settingsCommand = new PutCommand({
    TableName: tables.userSettings,
    Item: { ...params.settings, userId: params.userId },
  });

  logger.debug('Inserting user');
  await docClient.send(userCommand);

  logger.debug('Inserting settings');
  await docClient.send(settingsCommand);

  return params;
};

const retrieveUsers = async () => {
  const command = new ScanCommand({
    TableName: tables.users,
  });

  const response = await docClient.send(command);
  if (!response.Items) return [];
  return response.Items.map((i) => unmarshall(i));
};

export { getUserByEmail, persistUser, retrieveUsers };
