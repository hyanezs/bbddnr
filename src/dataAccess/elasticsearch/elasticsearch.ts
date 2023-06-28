import { Client } from '@elastic/elasticsearch';
import { logger } from '../../utils';
import seedElasticSearch from './seed';

const config = {
  node: process.env.ELASTICSEARCH_ENDPOINT!,
};

let client: Client;

const initElasticSearch = async () => {
  try {
    logger.info('Trying to connect to elasticsearch.');
    client = new Client(config);
    await seedElasticSearch();
    logger.info(
      'Connection to elasticsearch has been established successfully.',
    );
    return true;
  } catch (error: any) {
    logger.error('Unable to connect to elasticsearch:', error);
    throw error as Error;
  }
};

export { client, initElasticSearch };
