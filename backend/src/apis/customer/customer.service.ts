import { createCustomerWithParams, mapCustomer } from './customer.helper';
import { AppDataSource } from '../../config/data-source';
import { Customer } from './customer.model';

const customerRepository = AppDataSource.manager.getRepository(Customer);

const getCustomers = async (): Promise<Customer[]> => {
  const customers = await customerRepository.find();
  return customers;
};
const getCustomerById = async (customerId): Promise<Customer> => {
  const customer: Customer = await customerRepository.findOneBy({
    id: customerId,
  });
  if (customer === null) {
    throw new Error('Customer with that id not found');
  }
  return customer;
};
const getCustomerByName = async (customerName): Promise<Customer> => {
  const customer: Customer = await customerRepository.findOneBy({
    firstName: customerName,
  });
  if (customer === null) {
    throw new Error(`Category with name: ${customerName} not found`);
  }
  return customer;
};
const addCustomer = async (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address: string,
  city: string
): Promise<Customer> => {
  const customerToCreate: Customer = await createCustomerWithParams(
    firstName,
    lastName,
    email,
    phone,
    address,
    city
  );

  const addedCustomer: Customer = await customerRepository.save(
    customerToCreate
  );
  if (addedCustomer === null) {
    throw new Error('Customer not created');
  }

  return addedCustomer;
};

const modifyCustomer = async (id, req): Promise<Customer> => {
  const customer: Customer = await getCustomerById(id);

  const customerToModify: Customer = mapCustomer(req, customer);

  const modifiedCustomer = await customerRepository.save(customerToModify);
  if (modifiedCustomer === null) {
    throw new Error('Customer not modified');
  }
  return modifiedCustomer;
};

const removeCustomer = async (id): Promise<Customer> => {
  const customerToRemove: Customer = await getCustomerById(id);
  const removedCustomer: Customer = await customerRepository.remove(
    customerToRemove
  );
  if (removedCustomer === null) {
    throw new Error('Customer not removed');
  }
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
