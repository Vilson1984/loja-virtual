import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { createCategoryDto } from './entities/dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  criarCategoria(data: createCategoryDto) {
    const novaCategoria = this.categoryRepository.create(data);
    console.log('Nova Categoria Criada:', novaCategoria);
    return this.categoryRepository.save(novaCategoria);
  }

  getCategories() {
    const categories = this.categoryRepository.find();
    console.log('CATEGORIES SERVICE:', categories);
    return categories;
  }

  async updateCategory(id: number, dto: createCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ id });
    console.log('UPDATE CATEGORY SERVICE:', category);

    if (!category) {
      throw new Error('Category not found');
    }

    //Mesclaa os dados recebidos de dto com a categoria passada por id
    Object.assign(category, dto);

    return this.categoryRepository.save(category);
  }

  deleteCategory(id: number) {
    console.log('DELETE CATEGORY SERVICE:', id);
    return this.categoryRepository.delete(id);
  }
}
