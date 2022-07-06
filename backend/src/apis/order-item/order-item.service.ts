import { AppDataSource } from '../../config/data-source';
import { OrderItem } from './order-item.model';

const orderItemRepository = AppDataSource.getRepository(OrderItem);

const getOrderItems = async (): Promise<OrderItem[]> => {
  const orderItems: OrderItem[] = await orderItemRepository.find();
  return orderItems;
};

const getOrderItemById = async (orderItemId): Promise<OrderItem> => {
  const orderItem: OrderItem = await orderItemRepository.findOneBy({
    id: orderItemId,
  });
  if (orderItem === null) {
    throw new Error('Order item with that id not found');
  }
  return orderItem;
};
const addOrderItem = async (orderItem: OrderItem): Promise<OrderItem> => {
  const createdOrderItem: OrderItem = await orderItemRepository.save(orderItem);
  return createdOrderItem;
};
const removeOrderItem = async (id): Promise<OrderItem> => {
  const orderItemToRemove: OrderItem = await getOrderItemById(id);

  const removedOrderItem: OrderItem = await orderItemRepository.remove(
    orderItemToRemove
  );
  if (removedOrderItem === null) {
    throw new Error('Order item not removed');
  }
  return removedOrderItem;
};

export { getOrderItems, getOrderItemById, addOrderItem, removeOrderItem };
