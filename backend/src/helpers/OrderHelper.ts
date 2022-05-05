import { AppDataSource } from '../config/data-source';
import { Order, Payment, Restaurant, User } from '../entity';
import { OrderItem } from '../entity/OrderItem';

const orderRepository = AppDataSource.getRepository(Order);

export const createOrderWithItems = (
  orderItems: OrderItem[],
  restaurant: Restaurant,
  user: User,
  payment: Payment
): Order => {
  const createdOrder: Order = orderRepository.create({
    orderItems: orderItems,
    restaurant: restaurant,
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
