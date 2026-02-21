import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<any>,
  ) {}

  async create(userId: number): Promise<any> {
    const cart = {
      userId: userId,
      status: 'OPEN',
      items: [],
      total: 0,
    };
    return this.cartRepository.save(cart);
  }
}
