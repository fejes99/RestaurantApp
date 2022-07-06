import { User, RoleEnumType } from './../apis/user/user.model';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';
import { findUserById } from '../apis/user/user.service';
import expressAsyncHandler from 'express-async-handler';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader !== 'null') {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(authHeader, process.env.JWT_SECRET, (err: any, user: any) => {
      if (err) {
        res.status(401).json('Not Authorized');
        return res
          .status(403)
          .send({ success: false, message: 'Token Expired' });
      }
      next();
    });
  } else {
    res.status(403).json({ success: false, message: 'UnAuthorized' });
  }
};

export const protect = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        next();
      } catch (error) {
        res.status(401).json('Not Authorized, token failed');
      }
    }

    if (!token) {
      res.status(401).json('Not Authorized, no token');
    }

    next();
  }
);
