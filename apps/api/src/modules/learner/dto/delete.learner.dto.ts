import { IsNumber } from "class-validator";

export class DeleteLearnerDto {
    @IsNumber({}, { each: true })
    ids: number[]
}