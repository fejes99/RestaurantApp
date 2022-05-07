import { Request, Response } from 'express';
import { Employee } from '../entity';
import {
  createEmployeeWithParams,
  mapEmployee,
} from '../helpers/EmployeeHelper';
import {
  addEmployee,
  getEmployeeById,
  getEmployees,
  modifyEmployee,
  removeEmployee,
} from '../services';

const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
  const employees: Employee[] = await getEmployees();

  if (!employees) {
    res.status(404);
  }
  res.status(200).json(employees);
};
const getEmployee = async (req: Request, res: Response): Promise<void> => {
  const employeeId = req.params.id;
  const employee: Employee = await getEmployeeById(employeeId);

  if (!employee) {
    res.status(404);
    throw new Error('Employee not found');
  }

  res.status(200).json(employee);
};
const createEmployee = async (req: Request, res: Response): Promise<void> => {
  const employeeFirstName = req.body.firstName;
  const employeeLastName = req.body.lastName;
  const employeeEmail = req.body.email;
  const employeePhone = req.body.phone;
  const employeePosition = req.body.position;

  const EmployeeToCreate: Employee = createEmployeeWithParams(
    employeeFirstName,
    employeeLastName,
    employeeEmail,
    employeePhone,
    employeePosition
  );

  const createdEmployee: Employee = await addEmployee(EmployeeToCreate);

  if (!createdEmployee) {
    res.status(500);
  }

  res.status(201).json(createdEmployee);
};
const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  const employeeId = req.params.id;
  let employeeToUpdate: Employee = await getEmployeeById(employeeId);

  if (!employeeToUpdate) {
    res.status(404);
    throw new Error('Employee not found');
  }

  employeeToUpdate = mapEmployee(req, employeeToUpdate);

  const updatedEmployee: Employee = await modifyEmployee(employeeToUpdate);

  if (!updatedEmployee) {
    res.status(404);
    throw new Error('Employee not updated');
  }

  res.status(204).json(updatedEmployee);
};
const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  const employeeId = req.params.id;
  const employeeToDelete = await getEmployeeById(employeeId);

  const deletedEmployee = await removeEmployee(employeeToDelete);

  if (!deletedEmployee) {
    res.status(404);
  }

  res.json(deletedEmployee);
  res.status(204);
};

export {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
