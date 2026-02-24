import { IsArray, IsBoolean, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ChoiceDto } from './create-question.dto';

export class UpdateQuestionDto {
  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsEnum(['interests', 'personality', 'abilities'])
  category?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChoiceDto)
  choices?: ChoiceDto[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}