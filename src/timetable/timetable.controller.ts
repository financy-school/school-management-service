import { Controller, Get, Post, Body } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { Timetable } from './entities/timetable.entity';

@Controller('timetables')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Get()
  findAll() {
    return this.timetableService.findAll();
  }

  @Post()
  create(@Body() data: Partial<Timetable>) {
    return this.timetableService.create(data);
  }
}
