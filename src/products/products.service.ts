import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/products.entities';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import axios from 'axios';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>, // injeção do repositório da entidade Product
  ) {}
  // métodos para manipular produtos (CRUD) podem ser adicionados aqui abaixo:
  async create(data: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(data);
    const savedProduct = await this.productsRepository.save(product);
    console.log('ESTÁ NO CREATE DE SERVICE', data);

    await axios.post('http://localhost:3001/webhook', {
      event: 'PRODUCT_CREATED',
      productId: product.id,
      name: product.name,
      price: product.price,
    });

    // return this.productsRepository.save(product);
    return savedProduct;
  }

  findAll() {
    console.log('ESTÁ NO FINDALL DE SERVICE');
    return this.productsRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOneBy({ id });
    console.log('ESTÁ NO FINDONE DE SERVICE');
    Logger.log('ESTÁ NO FIND ONE DE SERVICE', product);
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
