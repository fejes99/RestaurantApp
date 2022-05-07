import { AppDataSource } from '../config/data-source';
import { Employee } from '../entity';

const employeeRepository = AppDataSource.manager.getRepository(Employee);

const getEmployees = async (): Promise<Employee[]> => {
  const employees = employeeRepository.find();
  return employees;
};
const getEmployeeById = async (employeeId): Promise<Employee> => {
  const employee = employeeRepository.findOneBy({ id: employeeId });
  return employee;
};
const getEmployeeByName = async (employeeName): Promise<Employee> => {
  const employee = employeeRepository.findOneBy({ firstName: employeeName });
  return employee;
};
const addEmployee = async (employee: Employee): Promise<Employee> => {
  const addedEmployee: Employee = await employeeRepository.save(employee);
  return addedEmployee;
};
const modifyEmployee = async (employee: Employee): Promise<Employee> => {
  const modifiedEmployee = await employeeRepository.save(employee);
  return modifiedEmployee;
};
const removeEmployee = async (employee: Employee): Promise<Employee> => {
  const removedEmployee = await employeeRepository.remove(employee);
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
