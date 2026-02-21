import { Cart } from '../../cart/entities/cart.entity';
import { Product } from '../../products/entities/products.entities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cart, (cart) => cart.items, {
    onDelete: 'CASCADE',
  })
  cart: Cart;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  productName: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  priceUnit: number;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;
}
