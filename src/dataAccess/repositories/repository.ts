import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { unmarshall } from '@aws-sdk/util-dynamodb';
import { docClient, tables } from '../dynamodb/dynamoDb';

const persistUser = async (params: Record<string, any>) => {
  console.log({ params });
  const command = new PutCommand({
    TableName: tables.users,
    Item: params,
  });

  const response = await docClient.send(command);
  console.log({ response });
  return params;
};

const retrieveUsrs = async () => {
  const command = new ScanCommand({
    TableName: tables.users,
  });

  const response = await docClient.send(command);
  if (!response.Items) return [];
  return response.Items.map((i) => unmarshall(i));
};

export { persistUser, retrieveUsrs };
