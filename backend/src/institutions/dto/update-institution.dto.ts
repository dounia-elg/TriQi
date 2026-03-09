import { IsArray, IsBoolean, IsEnum, IsMongoId, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateInstitutionDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(['university', 'school', 'center'])
  type?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  domainIds?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  programs?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
