import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
