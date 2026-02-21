import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/products.entities';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { PurchaseModule } from './purchase/purchase.module';
import { Purchase } from './purchase/entity/purchase.entity';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/entities/cart.entity';
import { CartItem } from './Cart-item/entities/cart-item';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: +(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASS ?? 'root',
      database: process.env.DB_NAME ?? 'loja-virtual',
      entities: [Product, Category, Purchase, Cart, CartItem],
      synchronize: true,
    }),
    ProductsModule,
    CategoryModule,
    PurchaseModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
