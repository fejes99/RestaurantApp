import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customer } from '../customer/customer.model';
import { OrderItem } from '../order-item/order-item.model';
import { Payment } from '../payment/payment.model';
import { User } from '../user/user.model';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ default: 0 })
  price: number;

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  createdAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
  })
  @JoinColumn()
  orderItems: OrderItem[];

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToOne(() => Payment, {
    cascade: true,
  })
  @JoinColumn()
  payment: Payment;
}
