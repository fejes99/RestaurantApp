import { User } from './user.model';
import { CreateUserInput } from './user.schema';
import { AppDataSource } from '../../config/data-source';
import { signJwt } from '../../utils/jwt';
import {
  accessTokenExpiresIn,
  redisCacheExpiresIn,
  refreshTokenExpiresIn,
} from '../../config/default';
import { mapUser } from './user.helper';

const userRepository = AppDataSource.getRepository(User);

export const findUser = async (query: Object) => {
  return await userRepository.findOneBy(query);
};
export const findUsers = async () => {
  const users = await userRepository.find();
  return users;
};

export const findUserById = async (userId: string) => {
  return await userRepository.findOneBy({ id: userId });
};

export const findUserByEmail = async ({ email }: { email: string }) => {
  const user: User = await userRepository.findOneBy({ email });
  return user;
};

export const createUser = async (input: CreateUserInput) => {
  return (await AppDataSource.manager.save(
    AppDataSource.manager.create(User, input)
  )) as User;
};

export const removeUser = async (id): Promise<User> => {
  const userToRemove: User = await findUserById(id);
  const removedUser: User = await userRepository.remove(userToRemove);
  if (removedUser === null) {
    throw new Error('User not removed');
  }
  return removedUser;
};

export const modifyUser = async (id, req): Promise<User> => {
  const user: User = await findUserById(id);

  const userToModify: User = mapUser(req, user);

  const modifiedUser = await userRepository.save(userToModify);
  if (modifiedUser === null) {
    throw new Error('User not modified');
  }
  return modifiedUser;
};
