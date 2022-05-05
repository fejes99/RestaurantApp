import { Request, Response } from 'express';
import { AppDataSource } from '../config/data-source';
import { Payment } from '../entity';
import { getPaymentById, getPayments } from '../services';

const paymentRepository = AppDataSource.manager.getRepository(Payment);

const getAllPayments = async (req: Request, res: Response): Promise<void> => {
  const payments: Payment[] = await getPayments();
  if (!payments) {
    res.status(404);
  }
  res.status(200).json(payments);
};
const getPayment = async (req: Request, res: Response): Promise<void> => {
  const paymentId = req.params.id;
  const payment: Payment = await getPaymentById(paymentId);

  if (!payment) {
    res.status(404);
    throw new Error('Payment not found');
  }

  res.status(200).json(payment);
};

export { getAllPayments, getPayment };
