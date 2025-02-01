import { PartialType } from '@nestjs/mapped-types';
import { CreateSchoolUserDto } from './create-school-user.dto';

export class UpdateSchoolUserDto extends PartialType(CreateSchoolUserDto) {}
