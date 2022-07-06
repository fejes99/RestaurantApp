import { Request, Response } from 'express';
import { getCustomerByName } from '../customer/customer.service';
import { createOrderItemWithParams } from '../order-item/order-item.helper';
import { createPayment } from '../payment/payment.helper';
import { Payment } from '../payment/payment.model';
import { getProductByName } from '../product/product.service';
import { User } from '../user/user.model';
import { findUserById } from '../user/user.service';
import { calculatePrice, createOrderWithItems } from './order.helper';
import { Order } from './order.model';
import {
  addOrder,
  getOrderById,
  getOrderByUser,
  getOrders,
  getOrdersWithRelations,
  removeOrder,
} from './order.service';

const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders: Order[] = await getOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json('Server error');
  }
};
const getAllOrdersExtended = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders: Order[] = await getOrdersWithRelations();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json('Server error');
  }
};
const getOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = req.params.id;
    const order: Order = await getOrderById(orderId);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const getOrderForUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const orders: Order[] = await getOrderByUser(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderItems = req.body.orderItems;
    const orderUserId = req.body.user.id;
    const user: User = await findUserById(orderUserId);

    const createdOrder: Order = await addOrder(orderItems, user);

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// const updateOrder = async (req: Request, res: Response): Promise<void> => {};
const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await removeOrder(orderId);
    res.status(204).json(deletedOrder);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

export {
  getAllOrders,
  getAllOrdersExtended,
  getOrder,
  getOrderForUser,
  createOrder,
  deleteOrder,
};
