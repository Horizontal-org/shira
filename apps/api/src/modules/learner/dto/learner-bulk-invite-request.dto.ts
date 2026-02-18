import { Type } from "class-transformer";
import { IsArray, IsEmail, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class BulkInviteValidatedLearnerDto {
  @IsNumber()
  row: number;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class BulkInviteValidatedRequestDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BulkInviteValidatedLearnerDto)
  learners: BulkInviteValidatedLearnerDto[];
}
