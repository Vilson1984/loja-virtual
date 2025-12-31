import { Injectable } from '@nestjs/common';
import { Product } from '../products/entities/products.entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PurchaseDto } from './dto/create-purchase.dto';
import { Purchase } from './entity/purchase.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,

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

    return this.purchaseRepository.save(purchase);
  }

  async findAllPurchase() {
    console.log('Caiu no service purchase findAllPurchase');
    const purchase = await this.purchaseRepository.find();
    return purchase;
  }

  async getPurchaseById(id: number) {
    console.log('Caiu no service purchase getPurchaseById com id: ', id);
    const purchase = await this.purchaseRepository.findOneBy({ id });
    return purchase;
  }

  async updatePurchase(id: number, data: PurchaseDto) {
    console.log('Caiu no service purchase updatePurchase com data: ', data);
    const purchase = await this.purchaseRepository.findOne({
      where: { id },
      relations: ['product'], // importante para carregar a relação com o produto
    });
    if (!purchase) throw new Error('Compra não encontrada');

    //se mudou o produto
    if (data.idProduct) {
      const product = await this.productRepository.findOneBy({
        id: data.idProduct,
      });

      if (!product) {
        throw new Error('Produto não encontrado');
      }

      purchase.product = product;
    }

    //se mudou a quantidade
    if (data.quantity) {
      purchase.quantity = data.quantity;
    }

    //atualiza o preço total
    purchase.totalPrice = Number(purchase.product.price) * purchase.quantity;

    Object.assign(purchase, data); // Atualiza somente os campos fornecidos em data
    return this.purchaseRepository.save(purchase);
  }

  async deletePurchase(id: number) {
    console.log('Caiu no service purchase com id, id');
    const purchase = await this.purchaseRepository.findOneBy({ id });
    if (!purchase) throw new Error('Compra não encontrada');
    return this.purchaseRepository.remove(purchase);
  }
}
