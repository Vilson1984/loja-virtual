import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/entities';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>, // injeção do repositório da entidade Product
  ) {}
  // métodos para manipular produtos (CRUD) podem ser adicionados aqui abaixo:
  async create(data: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(data);
    console.log('ESTÁ NO CREATE DE SERVICE', data);
    return this.productsRepository.save(product);
  }

  findAll() {
    console.log('ESTÁ NO FINDALL DE SERVICE');
    return this.productsRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOneBy({ id });
    console.log(
      'ESTÁ NO FINDONE DE SERVICE',
      await this.productsRepository.findOneBy({ id }),
    );
    if (!product) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }

    return product;
  }

  async update(id: number, data: UpdateProductDto): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id });

    if (!product) {
      throw new Error(`Produto com ID ${id} não encontrado`);
    }

    await this.productsRepository.update(id, data);

    return product;
  }

  async delete(id: number) {
    await this.productsRepository.delete(id);

    return { message: 'Produto removido com sucesso' };
  }
}
