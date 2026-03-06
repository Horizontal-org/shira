import { UpdateEmailAuthDto } from "src/modules/auth/domain/update-email.auth.dto";

export interface IRequestEmailUpdateUserService {
  execute(dto: UpdateEmailAuthDto, spaceId: number): Promise<void>;
}
