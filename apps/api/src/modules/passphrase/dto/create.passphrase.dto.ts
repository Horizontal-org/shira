import { IsNumber } from 'class-validator';

export class CreatePassphraseDto {
  @IsNumber()
  amount: number;
}
