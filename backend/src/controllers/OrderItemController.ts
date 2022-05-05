import { OrderItem, Product } from '../entity';
import {
  createOrderItemWithParams,
  recalculatePrice,
} from '../helpers/OrderItemHelper';
import { getOrderItemById, getProductById, removeOrderItem } from '../services';

const getOrderItem = async (orderItemId): Promise<OrderItem> => {
  const orderItem = await getOrderItemById(orderItemId);

  return orderItem;
};

const createOrderItem = async (
  productId,
  quantity: number
): Promise<OrderItem> => {
  const product: Product = await getProductById(productId);

  const orderItemToCreate: OrderItem = createOrderItemWithParams(
    product,
    quantity
  );

  if (!orderItemToCreate) {
    console.error('Cant create order item');
    return;
  }

  return orderItemToCreate;
};

const updateOrderItem = (orderItem: OrderItem, quantity: number): OrderItem => {
  return recalculatePrice(orderItem, quantity);
};

const deleteOrderItem = async (orderItem: OrderItem): Promise<void> => {
  await removeOrderItem(orderItem);
};
