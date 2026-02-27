import { Exclude, Expose } from "class-transformer";

@Exclude()
export class GetLearnersQuizzesDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  name?: string;

  @Expose()
  status: 'assigned' | 'in_progress' | 'completed'
}

