import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
export class School {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsNotEmpty()
  registration_number?: string;

  @IsOptional()
  @IsNotEmpty()
  country?: string;

  @IsOptional()
  @IsNotEmpty()
  state?: string;

  @IsOptional()
  @IsNotEmpty()
  city?: string;
}
