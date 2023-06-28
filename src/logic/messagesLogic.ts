import {
  persistMessage,
  retrieveMessages,
} from '../dataAccess/elasticsearch/repository';
import { type Message } from '../types/models';
import { generateUniqueId } from '../utils';
import { validateMessageAttributes } from '../validations/message';

const registerMessage = async (newMessage: Message) => {
  const id = generateUniqueId();
  const timestamp = Date.now();
  validateMessageAttributes({
    ...newMessage,
    hashtags: newMessage.hashtags || [],
    mentionedUsers: newMessage.mentionedUsers || [],
    mediaPaths: newMessage.mediaPaths || [],
  });
  const stored = await persistMessage({
    channelId: newMessage.channelId,
    data: newMessage.data,
    isPinned: newMessage.isPinned,
    userId: newMessage.userId,
    hashtags: newMessage.hashtags || [],
    mentionedUsers: newMessage.mentionedUsers || [],
    mediaPaths: newMessage.mediaPaths || [],
    id,
    timestamp,
  });
  return stored;
};

const getMessages = async () => {
  const messages = await retrieveMessages();
  return messages;
};

export { getMessages, registerMessage };
