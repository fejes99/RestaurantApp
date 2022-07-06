import { Request, Response } from 'express';
import { Customer } from './customer.model';
import {
  addCustomer,
  getCustomerById,
  getCustomers,
  modifyCustomer,
  removeCustomer,
} from './customer.service';

const getAllCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const customers: Customer[] = await getCustomers();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json('Server error');
  }
};
const getCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const customerId = req.params.id;
    const customer: Customer = await getCustomerById(customerId);

    res.status(200).json(customer);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const createCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const customerFirstName = req.body.firstName;
    const customerLastName = req.body.lastName;
    const customerEmail = req.body.email;
    const customerPhone = req.body.phone;
    const customerAddress = req.body.address;
    const customerCity = req.body.city;

    const createdCustomer: Customer = await addCustomer(
      customerFirstName,
      customerLastName,
      customerEmail,
      customerPhone,
      customerAddress,
      customerCity
    );

    res.status(201).json(createdCustomer);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const customerId = req.params.id;
    const updatedCustomer: Customer = await modifyCustomer(customerId, req);

    res.status(204).json(updatedCustomer);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const customerId = req.params.id;
    const deletedCustomer = await removeCustomer(customerId);

    res.status(204).json(deletedCustomer);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export {
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
