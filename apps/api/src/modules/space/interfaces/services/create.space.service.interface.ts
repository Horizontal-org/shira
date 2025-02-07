import { CreateSpaceDto } from "../../domain/create.space.dto";

export interface ICreateSpaceService {
    execute(createDto: CreateSpaceDto): Promise<void>;
}
  