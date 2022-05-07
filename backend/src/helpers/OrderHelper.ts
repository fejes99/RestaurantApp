import { AppDataSource } from '../config/data-source';
import { Order, Payment, Customer } from '../entity';
import { OrderItem } from '../entity/OrderItem';

const orderRepository = AppDataSource.getRepository(Order);

export const createOrderWithItems = (
  orderItems: OrderItem[],
  Customer: Customer,
  payment: Payment
): Order => {
  const createdOrder: Order = orderRepository.create({
    orderItems: orderItems,
    customer: Customer,
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
