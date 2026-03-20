import { IsInt, IsString } from 'class-validator';

export class CreateCheckoutDto {
  @IsInt()
  organizationId: number;

  @IsString()
  priceId: string;
}
