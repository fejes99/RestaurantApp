import { isSharedArrayBuffer } from 'util/types';
import { AppDataSource } from '../config/data-source';
import { Payment, Order } from '../entity';
import { addPayment } from '../services';

const paymentRepository = AppDataSource.manager.getRepository(Payment);

export const createPayment = async (price: number): Promise<Payment> => {
  const createdPayment: Payment = paymentRepository.create({
    price: price,
  });

  return createdPayment;
};
