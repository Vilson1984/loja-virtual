import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
