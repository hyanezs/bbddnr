import { BadRequestError } from '../exceptions';
import { type Message } from '../types/models';

const validateMessageAttributes = (message: Message): void => {
  const {
    userId,
    data,
    channelId,
    mentionedUsers,
    hashtags,
    mediaPaths,
    isPinned,
  } = message;

  if (!userId || typeof userId !== 'string') {
    throw new BadRequestError('userId is required and string.');
  }

  if (!data || typeof data !== 'string') {
    throw new BadRequestError('data is required and string.');
  }

  if (!channelId || typeof channelId !== 'string') {
    throw new BadRequestError('channelId is required and string.');
  }

  if (
    Array.isArray(mentionedUsers) &&
    mentionedUsers.some((item) => typeof item !== 'string')
  ) {
    throw new BadRequestError('mentionedUsers is an array of strings.');
  }

  if (
    Array.isArray(hashtags) &&
    hashtags.some((item) => typeof item !== 'string')
  ) {
    throw new BadRequestError('hashtags is an array of strings');
  }

  if (
    Array.isArray(mediaPaths) &&
    mediaPaths.some((item) => typeof item !== 'string')
  ) {
    throw new BadRequestError('mediaPaths is an array of strings');
  }

  if (isPinned && typeof isPinned !== 'boolean') {
    throw new BadRequestError('isPinned needs to be a boolean.');
  }
};

export { validateMessageAttributes };
