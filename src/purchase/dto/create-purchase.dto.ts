import { IsPositive, IsInt, Min, IsOptional } from 'class-validator';

export class PurchaseDto {
  @IsInt()
  @IsOptional() //Permite atualizar por parte dos campos
  idProduct?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Min(1)
  quantity: number;
}
