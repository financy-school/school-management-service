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

@Controller('school-users')
export class SchoolUserController {
  constructor(private readonly schoolUserService: SchoolUserService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.schoolUserService.validateUser(
      body.email,
      body.password,
    );
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return { message: 'Login successful', user };
  }

  @Get()
  findAll(): Promise<SchoolUser[]> {
    return this.schoolUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<SchoolUser> {
    return this.schoolUserService.findOne(id);
  }

  @Post()
  create(@Body() data: Partial<SchoolUser>): Promise<SchoolUser> {
    return this.schoolUserService.create(data);
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
