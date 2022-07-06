import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../order/order.model';
import { Product } from '../product/product.model';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ default: 0 })
  quantity: number;

  @Column({ default: 0 })
  price: number;

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.orderItems)
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderItems)
  order: Order;
}
