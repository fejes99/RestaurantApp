import { AppDataSource } from '../config/data-source';
import { Payment } from '../entity';

const paymentRepository = AppDataSource.manager.getRepository(Payment);

const getPayments = async (): Promise<Payment[]> => {
  const payments: Payment[] = await paymentRepository.find();
  return payments;
};

const getPaymentById = async (paymentId): Promise<Payment> => {
  const payment: Payment = await paymentRepository.findOneBy({ id: paymentId });
  return payment;
};

const addPayment = async (payment: Payment): Promise<Payment> => {
  const addedPayment = await paymentRepository.save(payment);
  return addedPayment;
};

export { getPayments, getPaymentById, addPayment };
