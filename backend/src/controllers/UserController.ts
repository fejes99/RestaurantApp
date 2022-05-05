import { Request, Response } from 'express';
import { User } from '../entity';
import { createUserWithParams, mapUser } from '../helpers/UserHelper';
import {
  addUser,
  getUserById,
  getUsers,
  modifyUser,
  removeUser,
} from '../services';

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  const users: User[] = await getUsers();

  if (!users) {
    res.status(404);
  }
  res.status(200).json(users);
};
const getUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  const user: User = await getUserById(userId);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json(user);
};
const createUser = async (req: Request, res: Response): Promise<void> => {
  const userFirstName = req.body.firstName;
  const userLastName = req.body.lastName;
  const userEmail = req.body.email;
  const userPhone = req.body.phone;

  const userToCreate: User = createUserWithParams(
    userFirstName,
    userLastName,
    userEmail,
    userPhone
  );

  const createdUser: User = await addUser(userToCreate);

  if (!createdUser) {
    res.status(500);
  }

  res.status(201).json(createdUser);
};
const updateUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  let userToUpdate: User = await getUserById(userId);

  if (!userToUpdate) {
    res.status(404);
    throw new Error('User not found');
  }

  userToUpdate = mapUser(req, userToUpdate);

  const updatedUser: User = await modifyUser(userToUpdate);

  if (!updatedUser) {
    res.status(404);
    throw new Error('user not updated');
  }

  res.status(204).json(updatedUser);
};
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;
  const userToDelete = await getUserById(userId);

  const deletedUser = await removeUser(userToDelete);

  if (!deletedUser) {
    res.status(404);
  }

  res.json(deletedUser);
  res.status(204);
};

export { getAllUsers, getUser, createUser, updateUser, deleteUser };
