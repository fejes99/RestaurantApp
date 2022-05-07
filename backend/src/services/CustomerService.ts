import { AppDataSource } from '../config/data-source';
import { Customer } from '../entity';

const customerRepository = AppDataSource.manager.getRepository(Customer);

const getCustomers = async (): Promise<Customer[]> => {
  const Customers = customerRepository.find();
  return Customers;
};
const getCustomerById = async (CustomerId): Promise<Customer> => {
  const Customer = customerRepository.findOneBy({ id: CustomerId });
  return Customer;
};
const getCustomerByName = async (CustomerName): Promise<Customer> => {
  const Customer = customerRepository.findOneBy({ firstName: CustomerName });
  return Customer;
};
const addCustomer = async (Customer: Customer): Promise<Customer> => {
  const addedCustomer: Customer = await customerRepository.save(Customer);
  return addedCustomer;
};
const modifyCustomer = async (Customer: Customer): Promise<Customer> => {
  const modifiedCustomer = await customerRepository.save(Customer);
  return modifiedCustomer;
};
const removeCustomer = async (Customer: Customer): Promise<Customer> => {
  const removedCustomer = await customerRepository.remove(Customer);
  return removedCustomer;
};

export {
  getCustomers,
  getCustomerById,
  getCustomerByName,
  addCustomer,
  modifyCustomer,
  removeCustomer,
};
