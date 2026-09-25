import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  ORGANIZATION_TYPES,
  OrganizationType,
} from '../../organization/domain/organization-type';

export class SendInvitationDto {
    @IsNotEmpty()
    @IsEmail()
    @Transform(({ value }) => value?.toLowerCase().trim())
    email: string

    @IsNotEmpty()
    @IsString()
    slug: string

  @IsNotEmpty()
  @IsString()
  @IsIn(ORGANIZATION_TYPES)
  orgType: OrganizationType;

    @IsNotEmpty()
    @IsString()
    subIntent: "starter" | "pro" | "enterprise"

    @IsOptional()
    @IsString()
    website?: string
}