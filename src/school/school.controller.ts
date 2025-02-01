import { Body, Controller, Get, Post } from '@nestjs/common';
import { SchoolService } from './school.service';
import { School } from './dto/create-school.dto';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  async createSchool(@Body() createSchoolDto: School) {
    return await this.schoolService.create(createSchoolDto);
  }

  @Get()
  async findAll() {
    return await this.schoolService.findAll();
  }

  @Get('/:school_id')
  async findSchoolById(school_id: string) {
    return await this.schoolService.findOne(school_id);
  }

  async getSchoolsByCityName(city_name: string) {}
}
