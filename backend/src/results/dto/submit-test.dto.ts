import { IsArray, IsInt, IsMongoId, IsNotEmpty, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AnswerDto {
  @IsMongoId()
  questionId: string;

  @IsInt()
  @Min(0)
  choiceIndex: number;
}

export class SubmitTestDto {
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}