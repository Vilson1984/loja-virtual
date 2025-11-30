import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { createCategoryDto } from './entities/dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  criarCategoria(@Body() data: createCategoryDto) {
    console.log('Está no Controller', data);
    return this.categoryService.criarCategoria(data);
  }

  @Get()
  getCategories() {
    console.log('ESTÁ NO CONTROLLER - GET CATEGORY');
    return this.categoryService.getCategories();
  }

  @Patch(':id')
  updateCategory(@Param('id') id: string, @Body() dto: createCategoryDto) {
    console.log('ESTÁ NO CONTROLLER PATCH CATEGORY', id);
    return this.categoryService.updateCategory(+id, dto); // +id converte string para number
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: string) {
    console.log('ESTÁ NO CONTROLLER DELETE CATEGORY', id);
    return this.categoryService.deleteCategory(+id);
  }
}
