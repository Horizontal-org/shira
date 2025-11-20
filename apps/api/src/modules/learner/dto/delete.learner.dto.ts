import { Type } from "class-transformer";
import { IsArray, IsNumber, ValidateNested } from "class-validator";

export class DeleteLearnerDto {
    @IsNumber({}, { each: true })
    ids: number[]
}