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
import { OrderItem, Customer, Payment } from '.';

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

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @OneToOne(() => Payment, {
    cascade: true,
  })
  @JoinColumn()
  payment: Payment;
}
