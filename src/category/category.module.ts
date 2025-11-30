import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category])], // Importa o módulo TypeOrmModule com a entidade Category
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [TypeOrmModule], // Exporta o módulo TypeOrmModule para que possa ser usado em outros módulos
})
export class CategoryModule {}
