import { Request } from 'express';
import { User } from './user.model';

export const mapUser = (req: Request, user: User): User => {
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.password = req.body.password || user.password;
  user.role = req.body.role || user.role;
  user.photo = req.body.photo || user.photo;

  return user;
};
