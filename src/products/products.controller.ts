/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/entities';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) {}
  // métodos para manipular produtos (CRUD) podem ser adicionados aqui abaixo:
  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    console.log('ESTÁ NO CREATE DE CONTROLLER', createProductDto);
    return this.ProductsService.create(createProductDto);
  }

  @Get()
  findAll() {
    console.log('ESTÁ NO FINDALL DE CONTROLLER');
    return this.ProductsService.findAll();
  }

  @Get(':id') // cria o endpoint /products/:123
  findOnde(@Param('id') id: number) {
    // Captura o valor do :id da URL
    console.log(
      'ESTÁ NO FINDONE DE CONTROLLER',
      this.ProductsService.findOne(id),
    );
    return this.ProductsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto): Promise<Product> {
    console.log('ESTÁ NO UPDATE DE CONTROLLER', id, updateProductDto);
    return this.ProductsService.update(id, updateProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.ProductsService.delete(Number(id));
  }
}
