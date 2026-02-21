import { Controller } from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Post()
  createCart(@Body('userId') userId: number) {
    return this.cartService.create(userId);
  }
}
