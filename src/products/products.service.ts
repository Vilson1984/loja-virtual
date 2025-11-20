import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/entities';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>, // injeção do repositório da entidade Product
  ) {}
  // métodos para manipular produtos (CRUD) podem ser adicionados aqui abaixo:
}
