import { Controller, Get, Post, Body } from '@nestjs/common';
import { ExamTimetableService } from './exam-timetable.service';
import { ExamTimetable } from './entities/exam-timetable.entity';

@Controller('exam-timetables')
export class ExamTimetableController {
  constructor(private readonly examTimetableService: ExamTimetableService) {}

  @Get()
  findAll() {
    return this.examTimetableService.findAll();
  }

  @Post()
  create(@Body() data: Partial<ExamTimetable>) {
    return this.examTimetableService.create(data);
  }
}
