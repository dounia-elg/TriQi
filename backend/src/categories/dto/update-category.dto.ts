import { IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }: { value: string }) => value.trim())
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
