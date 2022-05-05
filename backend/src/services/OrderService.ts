import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Order } from '../entity';

const orderRepository: Repository<Order> =
  AppDataSource.manager.getRepository(Order);

const getOrders = async (): Promise<Order[]> => {
  const orders: Order[] = await orderRepository.find();
  return orders;
};

const getOrdersWithRelations = async (): Promise<Order[]> => {
  const orders: Order[] = await orderRepository
    .createQueryBuilder('order')
    .leftJoinAndSelect('order.orderItems', 'orderItem')
    .leftJoinAndSelect('orderItem.product', 'product')
    .leftJoinAndSelect('order.restaurant', 'restaurant')
    .leftJoinAndSelect('order.user', 'user')
    .getMany();
  return orders;
};

const getOrderById = async (orderId): Promise<Order> => {
  const order: Order = await orderRepository.findOneBy({ id: orderId });
  return order;
};

const addOrder = async (order: Order): Promise<Order> => {
  const addedOrder = await orderRepository.save(order);
  return addedOrder;
};

const modifyOrder = async (order: Order): Promise<Order> => {
  const modifiedOrder = await orderRepository.save(order);
  return modifiedOrder;
};

const removeOrder = async (order: Order): Promise<Order> => {
  const removedOrder = await orderRepository.remove(order);
  return removedOrder;
};

export {
  getOrders,
  getOrdersWithRelations,
  getOrderById,
  addOrder,
  modifyOrder,
  removeOrder,
};
