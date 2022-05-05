import express from 'express';
import { getAllPayments, getPayment } from '../controllers';

const router = express.Router();

router.route('/').get(getAllPayments);
router.route('/:id').get(getPayment);

export default router;
