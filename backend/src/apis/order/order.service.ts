import { Repository } from 'typeorm';
import { AppDataSource } from '../../config/data-source';
import { createOrderItemWithParams } from '../order-item/order-item.helper';
import { createPayment } from '../payment/payment.helper';
import { Payment } from '../payment/payment.model';
import { getProductByName } from '../product/product.service';
import { calculatePrice, createOrderWithItems } from './order.helper';
import { Order } from './order.model';

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
    .leftJoinAndSelect('order.user', 'user')
    .getMany();
  return orders;
};

const getOrderById = async (orderId): Promise<Order> => {
  const order: Order = await orderRepository
    .createQueryBuilder('order')
    .leftJoinAndSelect('order.orderItems', 'orderItem')
    .leftJoinAndSelect('orderItem.product', 'product')
    .leftJoinAndSelect('order.user', 'user')
    .where('order.id = :id', { id: orderId })
    .getOne();

  if (order === null) {
    throw new Error('Order with that id not found');
  }
  return order;
};

const getOrderByUser = async (userId): Promise<Order[]> => {
  const order: Order[] = await orderRepository
    .createQueryBuilder('order')
    .leftJoinAndSelect('order.orderItems', 'orderItem')
    .leftJoinAndSelect('orderItem.product', 'product')
    .leftJoinAndSelect('order.user', 'user')
    .where('user.id = :id', { id: userId })
    .getMany();

  if (order === null) {
    throw new Error('Order with that id not found');
  }
  return order;
};

const addOrder = async (orderItems, user): Promise<Order> => {
  const payment: Payment = await createPayment(calculatePrice(orderItems));

  const orderToCreate: Order = createOrderWithItems(orderItems, user, payment);
  const addedOrder = await orderRepository.save(orderToCreate);
  return addedOrder;
};

const removeOrder = async (id): Promise<Order> => {
  const orderToRemove: Order = await getOrderById(id);

  const removedOrder = await orderRepository.remove(orderToRemove);
  if (removedOrder === null) {
    throw new Error('Order not removed');
  }
  return removedOrder;
};

export {
  getOrders,
  getOrdersWithRelations,
  getOrderById,
  getOrderByUser,
  addOrder,
  removeOrder,
};
