import { employees } from './employee.seed';
import { AppDataSource } from '../../config/data-source';
import { Employee } from './employee.model';
import { mapEmployee, createEmployeeWithParams } from './employee.helper';

const employeeRepository = AppDataSource.manager.getRepository(Employee);

const getEmployees = async (): Promise<Employee[]> => {
  const employees = employeeRepository.find();
  return employees;
};
const getEmployeeById = async (employeeId): Promise<Employee> => {
  const employee: Employee = await employeeRepository.findOneBy({
    id: employeeId,
  });
  if (employee === null) {
    throw new Error('Employee with that id not found');
  }
  return employee;
};
const getEmployeeByName = async (employeeName): Promise<Employee> => {
  const employee: Employee = await employeeRepository.findOneBy({
    firstName: employeeName,
  });
  if (employee === null) {
    throw new Error(`Employee with name: ${employeeName} not found`);
  }
  return employee;
};
const addEmployee = async (
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  position: string
): Promise<Employee> => {
  const employeeToCreate: Employee = createEmployeeWithParams(
    firstName,
    lastName,
    email,
    phone,
    position
  );

  const addedEmployee: Employee = await employeeRepository.save(
    employeeToCreate
  );
  if (addedEmployee === null) {
    throw new Error('Employee not created');
  }
  return addedEmployee;
};
const modifyEmployee = async (id, req): Promise<Employee> => {
  const employee: Employee = await getEmployeeById(id);

  const employeeToModify: Employee = mapEmployee(req, employee);

  const modifiedEmployee = await employeeRepository.save(employeeToModify);
  if (modifiedEmployee === null) {
    throw new Error('Employee not modified');
  }
  return modifiedEmployee;
};
const removeEmployee = async (id): Promise<Employee> => {
  const employeeToRemove: Employee = await getEmployeeById(id);

  const removedEmployee = await employeeRepository.remove(employeeToRemove);
  if (removedEmployee === null) {
    throw new Error('Employee not removed');
  }
  return removedEmployee;
};

export {
  getEmployees,
  getEmployeeById,
  getEmployeeByName,
  addEmployee,
  modifyEmployee,
  removeEmployee,
};
