import express from 'express';
import {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from './employee.controller';

const router = express.Router();

router.route('/').get(getAllEmployees);
router.route('/:id').get(getEmployee);
router.route('/').post(createEmployee);
router.route('/:id').put(updateEmployee);
router.route('/:id').delete(deleteEmployee);

export default router;
