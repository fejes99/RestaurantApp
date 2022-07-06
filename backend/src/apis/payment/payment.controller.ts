import { TypeOf } from 'zod';
import { products } from './../product/product.seed';
import { orderItems } from './../order-item/order-item.seed';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { AppDataSource } from '../../config/data-source';
import { Payment } from './payment.model';
import { getPayments, getPaymentById } from './payment.service';

// @ts-ignore: Unreachable code error
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const stripe = require('stripe')(
  'sk_test_51KqJulH5MMrzRR4dNDgUkI6sbATj5BOt9bzqOxkJZiz1sMv5eVSqR8Np8vi1h9wbhnih8RSpPQURmxOJMwjtFMr800GJkdg4vG'
);

let order;

const paymentRepository = AppDataSource.manager.getRepository(Payment);

const getAllPayments = async (req: Request, res: Response): Promise<void> => {
  try {
    const payments: Payment[] = await getPayments();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json('Server error');
  }
};
const getPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const paymentId = req.params.id;
    const payment: Payment = await getPaymentById(paymentId);
    res.status(200).json(payment);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

const createCheckoutSession = async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.user.id,
    },
  });
  order = req.body.order;
  console.log(typeof order.orderItems[0].product.quantity);
  const line_items = [
    {
      price_data: {
        currency: 'usd',
        product_data: {
          name: order.orderItems[0].product.name,
        },
        unit_amount: order.orderItems[0].product.price * 100,
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer: customer.id,
    success_url: `${process.env.CLIENT_URL}/`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({ url: session.url });
};

const webhook = async (req, res) => {
  const signature = req.headers['stripe-signature'];

  let data;
  let eventType;
  let endpointSecret;
  endpointSecret = process.env.STRIPE_WEBHOOK;

  if (endpointSecret) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        endpointSecret
      );
      console.log('Webhook verified.');
    } catch (err) {
      console.log(`Webhook signature verification failed:  ${err}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    // Extract the object from the event.
    data = event.data.object;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the checkout.session.completed event
  if (eventType === 'checkout.session.completed') {
    stripe.customers
      .retrieve(data.customer)
      .then(async (customer) => {
        try {
          console.log('Data from stripe', data);
          console.log('Customer', customer);
          // updateOrderToPaid(order, data);
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err.message));
  }
  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
};

export { getAllPayments, getPayment, webhook, createCheckoutSession };
