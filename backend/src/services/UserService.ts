import { AppDataSource } from '../config/data-source';
import { User } from '../entity';

const userRepository = AppDataSource.manager.getRepository(User);

const getUsers = async (): Promise<User[]> => {
  const users = userRepository.find();
  return users;
};
const getUserById = async (userId): Promise<User> => {
  const user = userRepository.findOneBy({ id: userId });
  return user;
};
const getUserByName = async (userName): Promise<User> => {
  const user = userRepository.findOneBy({ firstName: userName });
  return user;
};
const addUser = async (user: User): Promise<User> => {
  const addedUser: User = await userRepository.save(user);
  return addedUser;
};
const modifyUser = async (user: User): Promise<User> => {
  const modifiedUser = await userRepository.save(user);
  return modifiedUser;
};
const removeUser = async (user: User): Promise<User> => {
  const removedUser = await userRepository.remove(user);
  return removedUser;
};

export {
  getUsers,
  getUserById,
  getUserByName,
  addUser,
  modifyUser,
  removeUser,
};
