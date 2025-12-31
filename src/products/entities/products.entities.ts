import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

@Entity('product') // nome da tabela
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Category, (category) => category.product)
  category: Category;
}
