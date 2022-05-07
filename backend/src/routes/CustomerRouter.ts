import express from 'express';
import {
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getCustomer,
  updateCustomer,
} from '../controllers';

const router = express.Router();

router.route('/').get(getAllCustomers);
router.route('/:id').get(getCustomer);
router.route('/').post(createCustomer);
router.route('/:id').put(updateCustomer);
router.route('/:id').delete(deleteCustomer);

export default router;
