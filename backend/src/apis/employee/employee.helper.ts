import { Request } from 'express';
import { AppDataSource } from '../../config/data-source';
import { Employee } from './employee.model';

const employeeRepository = AppDataSource.getRepository(Employee);

export const createEmployeeWithParams = (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  position: string
): Employee => {
  const createdProduct: Employee = employeeRepository.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    phone: phone,
    position: position,
  });
  return createdProduct;
};

export const mapEmployee = (req: Request, employee: Employee): Employee => {
  employee.firstName = req.body.firstName || employee.firstName;
  employee.lastName = req.body.lastName || employee.lastName;
  employee.email = req.body.email || employee.email;
  employee.phone = req.body.phone || employee.phone;
  employee.position = req.body.position || employee.position;

  return employee;
};
