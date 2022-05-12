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
import { Option, Category, OrderItem, Review, Employee } from '.';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @Column()
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
  })
  @JoinTable()
  categories: Category[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @OneToMany(() => Review, (review) => review.product, {
    nullable: true,
  })
  reviews: Review[];

  @ManyToOne(() => Employee, (employee) => employee.products)
  employee: Employee;
}
