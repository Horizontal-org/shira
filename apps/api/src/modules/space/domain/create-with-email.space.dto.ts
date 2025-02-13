import { IsString } from 'class-validator';

export class CreateSpaceWithEmailDto {
    @IsString()
    name: string;

    @IsString()
    email: string
}
