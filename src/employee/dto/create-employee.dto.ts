import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsEnum,
  IsDate,
  Length,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';

export enum EmployeeRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  STAFF = 'staff',
  ACCOUNTANT = 'accountant',
  TEACHER = 'teacher',
}

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  @Length(2, 50, { message: 'First name must be between 2 and 50 characters' })
  firstName: string;

  @IsString()
  @IsOptional()
  @Length(2, 50, { message: 'Last name must be between 2 and 50 characters' })
  lastName?: string;

  @IsString()
  @IsNotEmpty()
  school_id: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsPhoneNumber(null, { message: 'Invalid phone number' })
  @IsNotEmpty({ message: 'Phone number is required' })
  phone: string;

  @IsEnum(EmployeeRole, {
    message: `Role must be one of: ${Object.values(EmployeeRole).join(', ')}`,
  })
  @IsNotEmpty({ message: 'Role is required' })
  role: EmployeeRole;

  @IsString()
  @IsOptional()
  @Length(10, 200, { message: 'Address must be between 10 and 200 characters' })
  address?: string;

  @IsDate({ message: 'Invalid date of joining' })
  @Type(() => Date) // Transform string to Date object
  @IsNotEmpty({ message: 'Date of joining is required' })
  dateOfJoining: Date;

  @IsString()
  @IsOptional()
  @Length(2, 100, {
    message: 'Designation must be between 2 and 100 characters',
  })
  designation?: string;
}
