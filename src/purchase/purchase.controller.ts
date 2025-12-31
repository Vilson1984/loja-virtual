import {
  Controller,
  Body,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
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

  @Patch(':id')
  updatePurchase(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: PurchaseDto,
  ) {
    console.log('Caiu no controller purchase updatePurchase com data: ', data);
    return this.purchaseService.updatePurchase(id, data);
  }

  @Delete(':id')
  deletePurchase(@Param('id', ParseIntPipe) id: number) {
    console.log('Caiu no controller purchase deletePurchase com id: ', id);
    return this.purchaseService.deletePurchase(id);
  }
}
