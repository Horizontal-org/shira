import { IsBoolean } from 'class-validator';

export class UpdateResultsEnabledSpaceDto {
  @IsBoolean()
  hasResultsEnabled: boolean;
}
