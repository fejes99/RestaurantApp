import { AppDataSource } from '../../config/data-source';
import { reduceProductInStock } from '../product/product.helper';
import { Product } from '../product/product.model';
import { OrderItem } from './order-item.model';

const orderItemRepository = AppDataSource.getRepository(OrderItem);

export const createOrderItemWithParams = (
  product: Product,
  quantity: number
): OrderItem => {
  if (productQuantityAvailable(quantity, product)) {
    const createdOrderItem: OrderItem = orderItemRepository.create({
      product: product,
      quantity: quantity,
      price: calculatePrice(product, quantity),
    });

    reduceProductInStock(quantity, product);
    return createdOrderItem;
  }
  return;
};

const calculatePrice = (product: Product, quantity: number): number => {
  return product.price * quantity;
};

export const recalculatePrice = (orderItem: OrderItem, quantity): OrderItem => {
  orderItem.price = orderItem.product.price * quantity;
  return orderItem;
};

const productQuantityAvailable = (
  quantity: number,
  product: Product
): boolean => {
  return product.stock >= quantity ? true : false;
};
