import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
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
}