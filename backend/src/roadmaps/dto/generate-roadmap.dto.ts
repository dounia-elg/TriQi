import { IsIn, IsOptional } from 'class-validator';

export class GenerateRoadmapDto {
  @IsOptional()
  @IsIn([3, 6], { message: 'durationMonths must be 3 or 6.' })
  durationMonths?: 3 | 6;
}
