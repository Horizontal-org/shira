import { IsEmail, IsString } from 'class-validator'

export class SendInvitationDto {
    @IsEmail()
    email: string
    @IsString()
    slug: string
}