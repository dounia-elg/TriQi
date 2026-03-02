import { IsArray, IsBoolean, IsNotEmpty, IsMongoId, IsOptional, IsString } from 'class-validator';

export class CreateDomainDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsMongoId()
  categoryId: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}