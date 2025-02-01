import { Controller, Get, Post, Body } from '@nestjs/common';
import { AdmissionService } from './admission.service';
import { Admission } from './entities/admission.entity';

@Controller('admissions')
export class AdmissionController {
  constructor(private readonly admissionService: AdmissionService) {}

  @Get()
  findAll() {
    return this.admissionService.findAll();
  }

  @Post()
  create(@Body() data: Partial<Admission>) {
    return this.admissionService.create(data);
  }
}
