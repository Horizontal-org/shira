export class GetLearnersDto {
  id: number;

  email: string;

  name?: string;

  status: 'invited' | 'registered'

  invitedAt?: Date;
}