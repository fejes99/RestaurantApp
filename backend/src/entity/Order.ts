import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderItem, Restaurant, User, Payment } from '.';

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

  @OneToOne(() => Restaurant)
  @JoinColumn()
  restaurant: Restaurant;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToOne(() => Payment, {
    cascade: true,
  })
  @JoinColumn()
  payment: Payment;
}
