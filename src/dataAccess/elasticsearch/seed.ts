import { tables } from '../../types/constants';
import { logger } from '../../utils';
import { client } from './elasticsearch';

const seedElasticSearch = async () => {
  logger.debug('Trying to seed elasticsearch.');
  const exists = await client.indices.exists({ index: tables.messages });
  logger.debug('checking if messages table exists.');

  if (exists) {
    logger.debug('messages table exists.');
    return;
  }

  logger.debug('messages table does not exist. creating it now.');
  await client.indices.create({
    index: tables.messages,
    body: {
      mappings: {
        properties: {
          id: { type: 'text' },
          data: { type: 'text' },
          userId: { type: 'keyword' },
          timestamp: { type: 'date' },
          channel: { type: 'text' },
          mentionedUsers: { type: 'keyword' },
          hashtags: { type: 'keyword' },
          mediaPath: { type: 'keyword' },
          isPinned: { type: 'boolean' },
        },
      },
    },
  });
};

export default seedElasticSearch;
