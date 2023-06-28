import {
  getUserByEmail,
  persistUser,
  retrieveUsers,
} from '../dataAccess/dynamodb/repository';
import { ConflictError } from '../exceptions';
import { type User } from '../types/models';
import { generateUniqueId, hashString, logger } from '../utils';
import { validateUserAttributes } from '../validations/user';

const registerUser = async (userFormData: User) => {
  validateUserAttributes(userFormData);
  logger.debug('Checking if email already exists.');
  const emailCheck = await getUserByEmail(userFormData.email);

  if (emailCheck?.Count && emailCheck?.Count > 0) {
    throw new ConflictError('Email already exists.');
  }

  logger.debug('Inserting.');

  const userId = generateUniqueId();
  const password = await hashString(userFormData.password);
  const newUser = await persistUser({
    birthdate: userFormData.birthdate,
    email: userFormData.email,
    gender: userFormData.gender,
    firstName: userFormData.firstName,
    lastName: userFormData.lastName,
    profileImagePath: userFormData.profileImagePath,
    username: userFormData.username,
    nitro: userFormData.nitro,
    userId,
    password,
    friends: userFormData.friends ?? [],
    servers: userFormData.servers ?? [],
    settings: userFormData.settings ?? {
      privacy: {
        allowDirectMessages: false,
        shareData: false,
        allowTracking: false,
      },
      security: {
        filterSpamLevel: 2,
        filterImageLevel: 2,
        twoFactor: undefined,
      },
    },
  });
  return newUser;
};

const getUsers = async () => {
  const users = await retrieveUsers();
  return users.map((user) => ({
    ...user,
    password: undefined,
  }));
};

export { getUsers, registerUser };
