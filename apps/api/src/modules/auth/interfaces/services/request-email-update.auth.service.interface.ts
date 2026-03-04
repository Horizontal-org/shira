import { UpdateEmailAuthDto } from '../../domain/update-email.auth.dto';

export interface IRequestEmailUpdateAuthService {
  execute(dto: UpdateEmailAuthDto, spaceId: number): Promise<void>;
}
