import express from 'express';
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
} from '../controllers';

const router = express.Router();

router.route('/').get(getAllEmployees);
router.route('/:id').get(getEmployee);
router.route('/').post(createEmployee);
router.route('/:id').put(updateEmployee);
router.route('/:id').delete(deleteEmployee);

export default router;
