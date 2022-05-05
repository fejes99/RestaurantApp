import express, { Express } from 'express';
import dotenv from 'dotenv';
import {
  productRouter,
  optionRouter,
  categoryRouter,
  restaurantRouter,
  userRouter,
  orderRouter,
  paymentRouter,
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
    app.use('/restaurants', restaurantRouter);
    app.use('/users', userRouter);
    app.use('/orders', orderRouter);
    app.use('/payments', paymentRouter);

    const port = process.env.PORT;

    app.listen(port, () => {
      console.log(`Express application is up and running on port ${port}`);
      seed();
    });
  })
  .catch((error) => console.log('TypeORM connection error: ', error));
