import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class AssociateUserDto {
    @IsNotEmpty({ message: 'userId is required' })
    @IsInt({ message: 'userId must be an integer' })
    @IsPositive({ message: 'userId must be positive' })
    @Type(() => Number)
    userId: number;

    @IsNotEmpty({ message: 'spaceId is required' })
    @IsInt({ message: 'spaceId must be an integer' })
    @IsPositive({ message: 'spaceId must be positive' })
    @Type(() => Number)
    spaceId: number;

    @IsNotEmpty({ message: 'roleSlug is required' })
    @IsString({ message: 'roleSlug must be a string' })
    roleSlug: string;
}