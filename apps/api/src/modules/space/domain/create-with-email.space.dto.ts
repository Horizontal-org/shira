import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSpaceWithEmailDto {
    @IsString()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string
}
