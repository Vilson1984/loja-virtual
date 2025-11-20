import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('product') // nome da tabela (opcional, senão usa "product")
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
