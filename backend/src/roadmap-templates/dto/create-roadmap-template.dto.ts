import { ArrayMinSize, IsArray, IsBoolean, IsIn, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TemplateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class TemplateWeekDto {
  @IsNumber()
  @Min(1)
  weekNumber: number;

  @IsString()
  @IsNotEmpty()
  theme: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'Each week must have at least 1 task.' })
  @ValidateNested({ each: true })
  @Type(() => TemplateTaskDto)
  tasks: TemplateTaskDto[];
}

export class CreateRoadmapTemplateDto {
  @IsMongoId()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  categoryName: string;

  @IsIn([3, 6], { message: 'durationMonths must be 3 or 6.' })
  durationMonths: number;

  @IsArray()
  @ArrayMinSize(1, { message: 'Template must have at least 1 week.' })
  @ValidateNested({ each: true })
  @Type(() => TemplateWeekDto)
  weeks: TemplateWeekDto[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
