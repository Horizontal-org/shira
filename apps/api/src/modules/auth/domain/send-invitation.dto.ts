import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

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
    orgType: 'business' | 'cibersecurity' | 'non-profit' | 'individual'

    @IsNotEmpty()
    @IsString()
    subIntent: "starter" | "pro" | "enterprise"
}