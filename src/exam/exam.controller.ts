import { Controller, Get, Post, Body } from '@nestjs/common';
import { ExamService } from './exam.service';
import { Exam } from './entities/exam.entity';

@Controller('exams')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get()
  findAll() {
    return this.examService.findAll();
  }

  @Post()
  create(@Body() data: Partial<Exam>) {
    return this.examService.create(data);
  }
}
