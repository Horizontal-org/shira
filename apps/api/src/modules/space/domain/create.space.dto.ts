import { IsNumber, IsString } from 'class-validator';
import { UserEntity } from 'src/modules/user/domain/user.entity';

export class CreateSpaceDto {
    @IsString()
    name: string;

    firstUser: UserEntity
}
