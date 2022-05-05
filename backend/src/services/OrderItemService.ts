import { AppDataSource } from '../config/data-source';
import { OrderItem } from '../entity';

const orderItemRepository = AppDataSource.getRepository(OrderItem);

const getOrderItems = async (): Promise<OrderItem[]> => {
  const orderItems: OrderItem[] = await orderItemRepository.find();
  return orderItems;
};

const getOrderItemById = async (orderItemId): Promise<OrderItem> => {
  const orderItem: OrderItem = await orderItemRepository.findOneBy({
    id: orderItemId,
  });
  return orderItem;
};
const addOrderItem = async (orderItem: OrderItem): Promise<OrderItem> => {
  const createdOrderItem: OrderItem = await orderItemRepository.save(orderItem);
  return createdOrderItem;
};
const removeOrderItem = async (orderItem: OrderItem): Promise<OrderItem> => {
  const removedOrderItem = await orderItemRepository.remove(orderItem);
  return removedOrderItem;
};

export { getOrderItems, getOrderItemById, addOrderItem, removeOrderItem };
