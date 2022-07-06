import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../product/product.model';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  @Check('"rating" >= 0 AND "rating" <= 5')
  rating: number;

  @Column({ nullable: true })
  comment: string;

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    onUpdate: 'NOW()',
    nullable: true,
  })
  updatedAt: Date;

  @ManyToOne(() => Product, (product) => product.orderItems, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  product: Product;
}
