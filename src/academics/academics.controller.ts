import { Controller, Get, Post, Body } from '@nestjs/common';
import { AcademicsService } from './academics.service';
import { Academics } from './entities/academic.entity';

@Controller('academics')
export class AcademicsController {
  constructor(private readonly academicsService: AcademicsService) {}

  @Get()
  findAll() {
    return this.academicsService.findAll();
  }

  @Post()
  create(@Body() data: Partial<Academics>) {
    return this.academicsService.create(data);
  }
}
