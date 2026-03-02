import { IsArray, IsBoolean, IsMongoId, IsOptional, IsString } from 'class-validator';

export class UpdateDomainDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsMongoId()
  categoryId?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;   
}