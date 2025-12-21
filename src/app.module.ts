import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entities/entities';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entity';
import { ApiExternaController } from './api-externa/api-externa.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? 'localhost',
      port: +(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER ?? 'postgres',
      password: process.env.DB_PASS ?? 'root',
      database: process.env.DB_NAME ?? 'loja-virtual',
      entities: [Product, Category],
      synchronize: true,
    }),
    ProductsModule,
    CategoryModule,
  ],
  controllers: [AppController, ApiExternaController],
  providers: [AppService],
})
export class AppModule {}
