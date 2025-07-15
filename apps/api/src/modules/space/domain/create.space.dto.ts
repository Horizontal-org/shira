import { isNumber, IsNumber, isString, IsString } from 'class-validator';
import { UserEntity } from 'src/modules/user/domain/user.entity';

export class CreateSpaceDto {
    @IsString()
    name: string;

    firstUser: UserEntity

    @IsString()
    slug: string;

    @IsNumber()
    organizationId: number;
}
