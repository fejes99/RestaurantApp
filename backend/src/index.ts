import express, { Express } from 'express';
import dotenv from 'dotenv';
import {
  productRouter,
  optionRouter,
  categoryRouter,
  customerRouter,
  orderRouter,
  paymentRouter,
  employeeRouter,
  reviewRouter,
} from './routes';
import { AppDataSource } from './config/data-source';
import { seedAll as seed } from './seed/seeder';

AppDataSource.initialize()
  .then(async () => {
    dotenv.config();

    const app: Express = express();
    app.use(express.json());

    app.use('/products', productRouter);
    app.use('/options', optionRouter);
    app.use('/categories', categoryRouter);
    app.use('/customers', customerRouter);
    app.use('/orders', orderRouter);
    app.use('/payments', paymentRouter);
    app.use('/employees', employeeRouter);
    app.use('/reviews', reviewRouter);

    const port = process.env.PORT;

    app.listen(port, () => {
      console.log(`Express application is up and running on port ${port}`);
      seed();
    });
  })
  .catch((error) => console.log('TypeORM connection error: ', error));
