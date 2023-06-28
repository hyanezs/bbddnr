import { tables } from '../../types/constants';
import { type Message } from '../../types/models';
import { client } from './elasticsearch';

const persistMessage = async (message: Message) =>
  client.index({
    index: tables.messages,
    body: message,
  });

const retrieveMessages = async () =>
  client.search({
    index: tables.messages,
    body: {
      query: {
        match_all: {},
      },
    },
  });

export { persistMessage, retrieveMessages };
