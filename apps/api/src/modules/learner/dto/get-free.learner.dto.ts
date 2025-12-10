import { Exclude, Expose } from "class-transformer";

@Exclude()
export class GetFreeLearnersDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name?: string;

  @Expose()
  invitedAt: Date
}

