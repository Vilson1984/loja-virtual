import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Product])], // registra a entidade DI(dependency injection), para assim poder usar o repositório dela no service
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
