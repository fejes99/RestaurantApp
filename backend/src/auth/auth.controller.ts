import { generateToken } from './../utils/jwt';
import { NextFunction, Request, Response } from 'express';
import {
  createUser,
  findUserByEmail,
  findUserById,
} from '../apis/user/user.service';
import AppError from '../utils/appError';
import { User } from '../apis/user/user.model';
import { CreateUserInput, LoginUserInput } from '../apis/user/user.schema';
import { resolve } from 'path';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, password, email, role } = req.body;

    const user = await createUser({
      name,
      email: email.toLowerCase(),
      password,
      role,
    });

    res.status(201).json({
      status: 'success',
      data: {
        user,
        token: generateToken(user.id),
      },
    });
  } catch (err: any) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'fail',
        message: 'User with that email already exist',
      });
    }
    next(err);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail({ email });
    if (user.email === 'test@mail.com') {
      if (!user || !(password == user.password)) {
        res.status(400).json('wrong password');
      }
    } else {
      if (!user || !(await User.comparePasswords(password, user.password))) {
        res.status(400).json('Invalid email or password');
      }
    }

    res.status(200).json({
      status: 'success',
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      token: generateToken(user.id),
    });
  } catch (err: any) {
    next(err);
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({
      status: 'success',
    });
  } catch (err: any) {
    next(err);
  }
};
