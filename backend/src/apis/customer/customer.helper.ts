import { Request } from 'express';
import { AppDataSource } from '../../config/data-source';
import { Customer } from './customer.model';

const customerRepository = AppDataSource.getRepository(Customer);

export const createCustomerWithParams = (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address?: string,
  city?: string
): Customer => {
  const createdProduct: Customer = customerRepository.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    address: address,
    city: city,
  });
  return createdProduct;
};

export const mapCustomer = (req: Request, customer: Customer): Customer => {
  customer.firstName = req.body.firstName || customer.firstName;
  customer.lastName = req.body.lastName || customer.lastName;
  customer.email = req.body.email || customer.email;
  customer.phone = req.body.phone || customer.phone;
  customer.address = req.body.address || customer.address;
  customer.city = req.body.city || customer.city;

  return customer;
};
