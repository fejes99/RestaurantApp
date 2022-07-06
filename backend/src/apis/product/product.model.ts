import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Category } from '../category/category.model';
import { Employee } from '../employee/employee.model';
import { Option } from '../option/option.model';
import { OrderItem } from '../order-item/order-item.model';
import { Review } from '../review/review.model';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: 0 })
  price: number;

  // @Column({ nullable: true })
  // image: string;

  @Column({ default: 0 })
  stock: number;

  @Column({ default: 0 })
  numberOfReviews: number;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 0 })
  reviewAverage: number;

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    onUpdate: 'NOW()',
    nullable: true,
  })
  updatedAt: Date;

  @ManyToMany(() => Option, (option) => option.products, {
    nullable: true,
  })
  @JoinTable()
  options: Option[];

  @ManyToMany(() => Category, (category) => category.products, {
    nullable: true,
    cascade: true,
  })
  @JoinTable()
  categories: Category[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @OneToMany(() => Review, (review) => review.product, {
    nullable: true,
    cascade: true,
  })
  reviews: Review[];

  @ManyToOne(() => Employee, (employee) => employee.products)
  employee: Employee;
}
