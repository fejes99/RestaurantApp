import { AppDataSource } from '../../config/data-source';
import { Payment } from './payment.model';

const paymentRepository = AppDataSource.manager.getRepository(Payment);

const getPayments = async (): Promise<Payment[]> => {
  const payments: Payment[] = await paymentRepository.find();
  return payments;
};

const getPaymentById = async (paymentId): Promise<Payment> => {
  const payment: Payment = await paymentRepository.findOneBy({ id: paymentId });
  if (payment === null) {
    throw new Error('Payment with that id not found');
  }
  return payment;
};

const addPayment = async (payment: Payment): Promise<Payment> => {
  const addedPayment = await paymentRepository.save(payment);
  return addedPayment;
};

export { getPayments, getPaymentById, addPayment };
