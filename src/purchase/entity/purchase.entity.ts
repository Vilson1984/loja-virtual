import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Product } from 'src/products/entities/products.entities';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'idProduct' })
  product: Product;

  @Column()
  quantity: number;

  @Column()
  name: string;

  @Column('decimal')
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;
}
