import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn() // define aqui a chave primária automática
  id: number;

  @Column()
  name: string;
}
