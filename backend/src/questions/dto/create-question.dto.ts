import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class DomainWeightDto {
  @IsString()
  @IsNotEmpty()
  domainId: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  weight: number;
}

export class ChoiceDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DomainWeightDto)
  weights: DomainWeightDto[];
}

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsEnum(['interests', 'personality', 'abilities'])
  category: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChoiceDto)
  choices: ChoiceDto[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}