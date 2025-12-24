import { Controller, Body, Post } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseDto } from './dto/create-purchase.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  createPurchase(@Body() data: PurchaseDto) {
    return this.purchaseService.createPurchase(data);
  }
}
