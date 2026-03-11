import { IsNotEmpty, IsString } from 'class-validator';

export class SuggestInstitutionsDto {
  @IsNotEmpty()
  @IsString()
  domain: string;

  @IsNotEmpty()
  @IsString()
  country: string;
}
