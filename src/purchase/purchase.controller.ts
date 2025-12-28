import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseDto } from './dto/create-purchase.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  createPurchase(@Body() data: PurchaseDto) {
    return this.purchaseService.createPurchase(data);
  }

  @Get()
  getAllPurchase() {
    console.log('Caiu no controller purchase getPurchase');
    return this.purchaseService.findAllPurchase();
  }

  @Get(':id')
  getPurchaseById(@Param('id', ParseIntPipe) id: number) {
    console.log('Caiu no controller purchase getPurchaseById com id: ', id);
    return this.purchaseService.getPurchaseById(id);
  }
}
