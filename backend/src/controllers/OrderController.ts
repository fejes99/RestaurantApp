import { Request, Response } from 'express';
import { Order, Payment } from '../entity';
import { calculatePrice, createOrderWithItems } from '../helpers/OrderHelper';
import { createOrderItemWithParams } from '../helpers/OrderItemHelper';
import { createPayment } from '../helpers/PaymentHelper';
import {
  addOrder,
  getOrderById,
  getOrders,
  getOrdersWithRelations,
  getProductByName,
  getRestaurantByName,
  getUserByName,
  removeOrder,
} from '../services';

const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  const orders: Order[] = await getOrders();

  if (!orders) {
    res.status(404);
  }
  res.status(200).json(orders);
};
const getAllOrdersExtended = async (
  req: Request,
  res: Response
): Promise<void> => {
  const orders: Order[] = await getOrdersWithRelations();

  if (!orders) {
    res.status(404);
  }
  res.status(200).json(orders);
};
const getOrder = async (req: Request, res: Response): Promise<void> => {
  const orderId = req.params.id;
  const order: Order = await getOrderById(orderId);

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.status(200).json(order);
};
const createOrder = async (req: Request, res: Response): Promise<void> => {
  const orderItems = req.body.orderItems;
  const orderRestaurant = req.body.restaurant;
  const orderUser = req.body.user;

  const restaurant = await getRestaurantByName(orderRestaurant);
  const user = await getUserByName(orderUser);

  let orderItemsForOrder = [];

  for (let i = 0; i < orderItems.length; i++) {
    // let product = orderItems[i].product;
    let product = await getProductByName(orderItems[i].product);
    let quantity = orderItems[i].quantity;
    let newOrderItem = createOrderItemWithParams(product, quantity);
    if (!newOrderItem) {
      res.status(404).json('Product out of stock');
      return;
    }
    orderItemsForOrder = [...orderItemsForOrder, newOrderItem];
  }

  const payment: Payment = await createPayment(
    calculatePrice(orderItemsForOrder)
  );

  const orderToCreate: Order = createOrderWithItems(
    orderItemsForOrder,
    restaurant,
    user,
    payment
  );

  const createdOrder: Order = await addOrder(orderToCreate);

  if (!createdOrder) {
    res.status(500);
  }

  res.status(201).json(createdOrder);
};
// const updateOrder = async (req: Request, res: Response): Promise<void> => {};
const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  const orderId = req.params.id;
  const orderToDelete = await getOrderById(orderId);

  const deletedOrder = await removeOrder(orderToDelete);

  if (!deletedOrder) {
    res.status(404);
  }

  res.json(deletedOrder);
  res.status(204);
};
function findProductById(product: any) {
  throw new Error('Function not implemented.');
}

export {
  getAllOrders,
  getAllOrdersExtended,
  getOrder,
  createOrder,
  deleteOrder,
};
