import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { SchoolUserService } from './school-user.service';
import { SchoolUser } from './entities/school-user.entity';
import { CreateSchoolUserDto } from './dto/create-school-user.dto';

@Controller('school-user')
export class SchoolUserController {
  constructor(private readonly schoolUserService: SchoolUserService) {}

  @Post('register')
  async register(@Body() register_school_user_dto: CreateSchoolUserDto) {
    const user = await this.schoolUserService.create(register_school_user_dto);
    return { message: 'Registration successful', user };
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return await this.schoolUserService.validateUser(body.email, body.password);
  }

  @Get()
  findAll(): Promise<SchoolUser[]> {
    return this.schoolUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<SchoolUser> {
    return this.schoolUserService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<SchoolUser>) {
    return this.schoolUserService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.schoolUserService.delete(id);
  }
}
