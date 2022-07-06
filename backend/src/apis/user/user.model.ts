import {
  Entity,
  Column,
  Index,
  CreateDateColumn,
  BeforeInsert,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import { Order } from '../order/order.model';

export enum RoleEnumType {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Index('email_index')
  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: RoleEnumType,
    default: RoleEnumType.USER,
  })
  role: RoleEnumType.USER;

  @Column({
    default: 'default.png',
  })
  photo: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @CreateDateColumn({ type: 'timestamp without time zone', default: 'NOW()' })
  createdAt: Date;

  toJSON() {
    return { ...this, password: undefined, verified: undefined };
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}
