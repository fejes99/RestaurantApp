import { AppDataSource } from '../../config/data-source';
import { Customer } from '../customer/customer.model';
import { OrderItem } from '../order-item/order-item.model';
import { Payment } from '../payment/payment.model';
import { User } from '../user/user.model';
import { Order } from './order.model';

const orderRepository = AppDataSource.getRepository(Order);

export const createOrderWithItems = (
  orderItems: OrderItem[],
  user: User,
  payment: Payment
): Order => {
  const createdOrder: Order = orderRepository.create({
    orderItems: orderItems,
    user: user,
    payment: payment,
    price: calculatePrice(orderItems),
  });

  return createdOrder;
};
export const calculatePrice = (orderItems: OrderItem[]): number => {
  const price: number = orderItems.reduce(
    (acc, orderItem) => orderItem.price + acc,
    0
  );
  return price;
};
