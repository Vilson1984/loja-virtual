import { Injectable } from '@nestjs/common';
import { Product } from '../products/entities/entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseDto } from './dto/create-purchase.dto';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  async createPurchase(data: PurchaseDto) {
    const product = await this.productRepository.findOneBy({
      id: data.idProduct,
    });
    if (!product) throw new Error('Produto não encontrado');

    const totalPrice = Number(product.price) * data.quantity;

    const purchase = {
      idProduct: data.idProduct,
      name: product.name,
      priceUnit: product.price,
      quantity: data.quantity,
      totalPrice,
      createAt: new Date(),
    };

    return purchase;
  }
}
