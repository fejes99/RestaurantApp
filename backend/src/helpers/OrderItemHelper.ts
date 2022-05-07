import { AppDataSource } from '../config/data-source';
import { OrderItem, Product } from '../entity';
import { reduceProductInStock } from './ProductHelper';

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
