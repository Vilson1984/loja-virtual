import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path/win32';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(
    //ativa validação global
    new ValidationPipe({
      whitelist: true, //remove propriedades não definidas no DTO
      forbidNonWhitelisted: true, //gera erro se propriedades não definidas no DTO forem enviadas
      transform: true, //converte tipos automaticamente com base nos tipos definidos no DTO
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  }); //serve arquivos estáticos da pasta 'public'
  await app.listen(3000);
}
bootstrap();
