import { Controller, Get, Post, Body } from '@nestjs/common';
import { GuardianService } from './guardian.service';
import { Guardian } from './entities/guardian.entity';

@Controller('guardians')
export class GuardianController {
  constructor(private readonly guardianService: GuardianService) {}

  @Get()
  findAll() {
    return this.guardianService.findAll();
  }

  @Post()
  create(@Body() data: Partial<Guardian>) {
    return this.guardianService.create(data);
  }
}
