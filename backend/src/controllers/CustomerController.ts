import { Request, Response } from 'express';
import { Customer } from '../entity';
import {
  createCustomerWithParams,
  mapCustomer,
} from '../helpers/CustomerHelper';
import {
  addCustomer,
  getCustomerById,
  getCustomers,
  modifyCustomer,
  removeCustomer,
} from '../services';

const getAllCustomers = async (req: Request, res: Response): Promise<void> => {
  const customers: Customer[] = await getCustomers();

  if (!customers) {
    res.status(404);
  }
  res.status(200).json(customers);
};
const getCustomer = async (req: Request, res: Response): Promise<void> => {
  const customerId = req.params.id;
  const customer: Customer = await getCustomerById(customerId);

  if (!customer) {
    res.status(404);
    throw new Error('Customer not found');
  }

  res.status(200).json(customer);
};
const createCustomer = async (req: Request, res: Response): Promise<void> => {
  const customerFirstName = req.body.firstName;
  const customerLastName = req.body.lastName;
  const customerEmail = req.body.email;
  const customerPhone = req.body.phone;
  const customerAddress = req.body.address;
  const customerCity = req.body.city;

  const customerToCreate: Customer = createCustomerWithParams(
    customerFirstName,
    customerLastName,
    customerEmail,
    customerPhone,
    customerAddress,
    customerCity
  );

  const createdCustomer: Customer = await addCustomer(customerToCreate);

  if (!createdCustomer) {
    res.status(500);
  }

  res.status(201).json(createdCustomer);
};
const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  const customerId = req.params.id;
  let customerToUpdate: Customer = await getCustomerById(customerId);

  if (!customerToUpdate) {
    res.status(404);
    throw new Error('Customer not found');
  }

  customerToUpdate = mapCustomer(req, customerToUpdate);

  const updatedCustomer: Customer = await modifyCustomer(customerToUpdate);

  if (!updatedCustomer) {
    res.status(404);
    throw new Error('Customer not updated');
  }

  res.status(204).json(updatedCustomer);
};
const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  const customerId = req.params.id;
  const customerToDelete = await getCustomerById(customerId);

  const deletedCustomer = await removeCustomer(customerToDelete);

  if (!deletedCustomer) {
    res.status(404);
  }

  res.json(deletedCustomer);
  res.status(204);
};

export {
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
