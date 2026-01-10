/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/products.entities';
import { ProductsService } from './products.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  // métodos para manipular produtos (CRUD) podem ser adicionados aqui abaixo:
  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    console.log('ESTÁ NO CREATE DE CONTROLLER', createProductDto);
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    console.log('ESTÁ NO FINDALL DE CONTROLLER');
    return this.productsService.findAll();
  }

  @Get(':id') // cria o endpoint /products/:123
  findOnde(@Param('id') id: number) {
    // Captura o valor do :id da URL
    console.log(
      'ESTÁ NO FINDONE DE CONTROLLER',
      this.productsService.findOne(id),
    );
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto): Promise<Product> {
    console.log('ESTÁ NO UPDATE DE CONTROLLER', id, updateProductDto);
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(Number(id));
  }

  @Post(':id/image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  uploadImage(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return this.productsService.attachImage(id, file.filename);
  }
}
