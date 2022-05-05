import express from 'express';
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getAllOrdersExtended,
  getOrder,
} from '../controllers';

const router = express.Router();

router.route('/').get(getAllOrders);
router.route('/extended').get(getAllOrdersExtended);
router.route('/:id').get(getOrder);
router.route('/').post(createOrder);
router.route('/:id').delete(deleteOrder);

export default router;
