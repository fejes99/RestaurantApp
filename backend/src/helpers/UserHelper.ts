import { Request } from 'express';
import { AppDataSource } from '../config/data-source';
import { User } from '../entity';

const userRepository = AppDataSource.getRepository(User);

export const createUserWithParams = (
  firstName: string,
  lastName: string,
  email: string,
  phone: string
): User => {
  const createdProduct: User = userRepository.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
  });
  return createdProduct;
};

export const mapUser = (req: Request, user: User): User => {
  user.firstName = req.body.firstName || user.firstName;
  user.lastName = req.body.lastName || user.lastName;
  user.email = req.body.email || user.email;
  user.phone = req.body.phone || user.phone;

  return user;
};
