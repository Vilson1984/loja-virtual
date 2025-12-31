import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entities';
import { Category } from 'src/category/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])], // registra a entidade DI(dependency injection), para assim poder usar o repositório dela no service
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
