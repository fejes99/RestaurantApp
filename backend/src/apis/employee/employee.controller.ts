import { Request, Response } from 'express';
import { createEmployeeWithParams, mapEmployee } from './employee.helper';
import { Employee } from './employee.model';
import {
  addEmployee,
  getEmployeeById,
  getEmployees,
  modifyEmployee,
  removeEmployee,
} from './employee.service';

const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const employees: Employee[] = await getEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json('Server error');
  }
};
const getEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employeeId = req.params.id;
    const employee: Employee = await getEmployeeById(employeeId);

    res.status(200).json(employee);
  } catch (error) {
    res.status(404).json(error.message);
  }
};
const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employeeFirstName = req.body.firstName;
    const employeeLastName = req.body.lastName;
    const employeeEmail = req.body.email;
    const employeePhone = req.body.phone;
    const employeePosition = req.body.position;

    const createdEmployee: Employee = await addEmployee(
      employeeFirstName,
      employeeLastName,
      employeeEmail,
      employeePhone,
      employeePosition
    );

    res.status(201).json(createdEmployee);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employeeId = req.params.id;
    const updatedEmployee: Employee = await modifyEmployee(employeeId, req);

    res.status(204).json(updatedEmployee);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const employeeId = req.params.id;
    const deletedEmployee = await removeEmployee(employeeId);

    res.status(204).json(deletedEmployee);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
