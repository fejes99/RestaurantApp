import express from 'express';
import {
  getAllOrders,
  getAllOrdersExtended,
  getOrder,
  getOrderForUser,
  createOrder,
  deleteOrder,
} from './order.controller';

const router = express.Router();

router.route('/').get(getAllOrders);
router.route('/extended').get(getAllOrdersExtended);
router.route('/:id').get(getOrder);
router.route('/user/:id').get(getOrderForUser);
router.route('/').post(createOrder);
router.route('/:id').delete(deleteOrder);

export default router;
