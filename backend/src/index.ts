import dotenv from 'dotenv';
import express, { Express, Response } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import { AppDataSource } from './config/data-source';

import categoryRouter from './apis/category/category.router';
import customerRouter from './apis/customer/customer.router';
import employeeRouter from './apis/employee/employee.router';
import optionRouter from './apis/option/option.router';
import orderRouter from './apis/order/order.router';
import paymentRouter from './apis/payment/payment.router';
import productRouter from './apis/product/product.router';
import reviewRouter from './apis/review/review.router';

import { seedAll as seed } from './seed/seeder';
import notFound from './middlewares/errors/not-found';
import errorHandlerMiddleware from './middlewares/errors/error-handler';
import userRouter from './apis/user/user.router';
import authRouter from './auth/auth.router';

const stripe = require('stripe')(
  'sk_test_51KqJulH5MMrzRR4dNDgUkI6sbATj5BOt9bzqOxkJZiz1sMv5eVSqR8Np8vi1h9wbhnih8RSpPQURmxOJMwjtFMr800GJkdg4vG'
);

AppDataSource.initialize()
  .then(async () => {
    dotenv.config();

    const app: Express = express();
    app.use(express.json());

    app.use(morgan('dev'));

    app.use(cookieParser());

    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/categories', categoryRouter);
    app.use('/api/customers', customerRouter);
    app.use('/api/employees', employeeRouter);
    app.use('/api/options', optionRouter);
    app.use('/api/orders', orderRouter);
    app.use('/api/payments', paymentRouter);
    app.use('/api/products', productRouter);
    app.use('/api/reviews', reviewRouter);

    app.use(
      '/api/stripe/webhook',
      express.json({
        verify: (req, res, buf) => {
          // @ts-ignore: Unreachable code error
          req.rawBody = buf.toString();
        },
      })
    );

    app.use(notFound);
    app.use(errorHandlerMiddleware);

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      console.log(`Express application is up and running on port ${port}`);
      // seed();
    });
  })
  .catch((error) => console.log('TypeORM connection error: ', error));
