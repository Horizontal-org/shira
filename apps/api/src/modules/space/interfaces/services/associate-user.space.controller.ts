import { AssociateUserDto } from "../../domain/associate-user.space.dto";

export interface IAssociateUserSpaceService {
    execute(dto: AssociateUserDto): Promise<void>;
}