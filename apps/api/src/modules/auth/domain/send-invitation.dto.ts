import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class SendInvitationDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    slug: string

    @IsNotEmpty()
    @IsString()
    orgType: 'business' | 'cibersecurity' | 'non-profit' | 'individual'
}