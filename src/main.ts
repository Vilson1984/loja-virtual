import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    //ativa validação global
    new ValidationPipe({
      whitelist: true, //remove propriedades não definidas no DTO
      forbidNonWhitelisted: true, //gera erro se propriedades não definidas no DTO forem enviadas
      transform: true, //converte tipos automaticamente com base nos tipos definidos no DTO
    }),
  );
  await app.listen(3000);
}
bootstrap();
