import { Product } from '../product/product.model';
import { getProductById } from '../product/product.service';
import {
  createOrderItemWithParams,
  recalculatePrice,
} from './order-item.helper';
import { OrderItem } from './order-item.model';
import { getOrderItemById, removeOrderItem } from './order-item.service';

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
