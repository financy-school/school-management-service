import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
export class School {
  @IsString()
  @IsNotEmpty()
  readonly school_name: string;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  readonly email?: string;

  @IsOptional()
  @IsString()
  readonly website?: string;

  @IsString()
  @IsNotEmpty()
  registration_number: string;
}
