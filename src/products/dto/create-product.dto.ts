/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNumber, Length, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsNumber()
  @Min(0)
  price: number;
}
