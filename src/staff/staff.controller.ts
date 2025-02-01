import { Controller, Get, Post, Body } from '@nestjs/common';
import { StaffService } from './staff.service';
import { Staff } from './entities/staff.entity';

@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Get()
  findAll() {
    return this.staffService.findAll();
  }

  @Post()
  create(@Body() data: Partial<Staff>) {
    return this.staffService.create(data);
  }

  @Post('bulk')
  bulkCreate(@Body() data: Partial<Staff>[]) {
    return this.staffService.bulkCreate(data);
  }
}
