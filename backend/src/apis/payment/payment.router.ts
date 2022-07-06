import express from 'express';
import {
  createCheckoutSession,
  getAllPayments,
  getPayment,
  webhook,
} from './payment.controller';

const router = express.Router();

router.route('/').get(getAllPayments);
router.route('/:id').get(getPayment);
router.route('/create-checkout-session').post(createCheckoutSession);
router.route('/webhook').post(webhook);

export default router;
