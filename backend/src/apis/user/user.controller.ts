import { User } from './user.model';
import { string } from 'zod';
import { NextFunction, Request, Response } from 'express';
import {
  findUserById,
  findUsers,
  findUserByEmail,
  removeUser,
  modifyUser,
} from './user.service';
import { isDate } from 'class-validator';

export const getUser = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const user = await findUserById(id);

  if (user) {
    res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404).json('User not found');
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await findUsers();
  res.status(200).json(users);
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const deletedUser = await removeUser(userId);

    res.status(204).json(deletedUser);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.params.id;
    const updatedUser: User = await modifyUser(userId, req);

    res.status(204).json(updatedUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
