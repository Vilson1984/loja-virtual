import { IsPositive, IsInt, Min } from 'class-validator';

export class PurchaseDto {
  @IsInt()
  idProduct: number;

  @IsInt()
  @IsPositive()
  @Min(1)
  quantity: number;
}
