import { Controller, Get, Post, Body } from '@nestjs/common';
import { FeeService } from './fees.service';
import { Fee } from './entities/fee.entity';

@Controller('fees')
export class FeeController {
  constructor(private readonly feeService: FeeService) {}

  @Get()
  findAll() {
    return this.feeService.findAll();
  }

  @Post()
  create(@Body() data: Partial<Fee>) {
    return this.feeService.create(data);
  }
}
