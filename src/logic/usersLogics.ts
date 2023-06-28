import { persistUser } from '../dataAccess/repositories';
import { retrieveUsrs } from '../dataAccess/repositories/repository';
import { type RegisterUser } from '../types';
import { generateUniqueId } from '../utils';

const registerUser = async (userFormData: RegisterUser) => {
  const id = generateUniqueId();
  const newUser = await persistUser({ ...userFormData, id });
  return newUser;
};

const getUsers = async () => {
  const users = await retrieveUsrs();
  return users;
};

export { getUsers, registerUser };
