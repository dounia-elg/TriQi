import { IsArray, IsBoolean, IsIn, IsMongoId, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { TemplateWeekDto } from './create-roadmap-template.dto';

export class UpdateRoadmapTemplateDto {
  @IsOptional()
  @IsMongoId()
  categoryId?: string;

  @IsOptional()
  @IsString()
  categoryName?: string;

  @IsOptional()
  @IsIn([3, 6])
  durationMonths?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TemplateWeekDto)
  weeks?: TemplateWeekDto[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
