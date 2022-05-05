import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Option, Category, OrderItem } from '.';

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

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    onUpdate: 'NOW()',
    nullable: true,
  })
  updatedAt: Date;

  @Column({ default: 0 })
  stock: number;

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
}
