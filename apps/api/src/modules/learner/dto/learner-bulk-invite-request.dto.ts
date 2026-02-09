import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsEmail, IsInt, IsNotEmpty, IsString, Min, ValidateNested } from "class-validator";

export class BulkInviteValidatedLearnerDto {
  @IsInt()
  @Min(1)
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
