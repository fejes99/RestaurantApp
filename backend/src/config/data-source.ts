import 'reflect-metadata';
import { DataSource } from 'typeorm';
import {
  Product,
  Option,
  Category,
  OrderItem,
  Customer,
  Employee,
  Order,
  Review,
} from '../entity';
import { Payment } from '../entity/Payment';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_CustomerNAME as string,
  password: process.env.DATABASE_PASSWORD as string,
  database: 'restaurantApp',
  synchronize: true,
  logging: false,
  entities: [
    Product,
    Option,
    Category,
    OrderItem,
    Customer,
    Order,
    Payment,
    Review,
    Employee,
  ],
  migrations: [],
  subscribers: [],
  dropSchema: true,
});
