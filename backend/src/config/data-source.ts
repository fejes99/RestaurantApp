import { Initial1654369336518 } from './../migrations/1654369336518-Initial';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Category } from '../apis/category/category.model';
import { Customer } from '../apis/customer/customer.model';
import { Employee } from '../apis/employee/employee.model';
import { Option } from '../apis/option/option.model';
import { OrderItem } from '../apis/order-item/order-item.model';
import { Order } from '../apis/order/order.model';
import { Payment } from '../apis/payment/payment.model';
import { Product } from '../apis/product/product.model';
import { Review } from '../apis/review/review.model';
import { User } from '../apis/user/user.model';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST as string,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME as string,
  password: process.env.DATABASE_PASSWORD as string,
  database: process.env.DATABASE_NAME as string,
  synchronize: true,
  logging: false,
  entities: [
    Category,
    Customer,
    Employee,
    Option,
    Order,
    OrderItem,
    Payment,
    Product,
    Review,
    User,
  ],

  migrations: [Initial1654369336518],
});
