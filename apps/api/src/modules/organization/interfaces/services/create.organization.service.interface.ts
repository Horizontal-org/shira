import { UserEntity } from 'src/modules/user/domain/user.entity';
import { OrganizationEntity } from '../../domain/organization.entity';
import { OrganizationType } from '../../domain/organization-type';

export interface ICreateOrganizationService {
  execute(
    name: string,
    orgType: OrganizationType,
    firstUser: UserEntity,
  ): Promise<OrganizationEntity>;
}