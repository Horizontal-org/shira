export type BulkStatus = "OK" | "Error" | "Skipped";

export class BulkLearnerRowResultDto {
  row: number;
  email: string;
  name: string;
  status: BulkStatus;
  message?: string;
}

export class BulkInviteLearnersResponseDto {
  total: number;
  results: BulkLearnerRowResultDto[];
}
