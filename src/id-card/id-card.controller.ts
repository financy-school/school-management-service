import { Controller, Get, Post, Body } from '@nestjs/common';
import { IDCardService } from './id-card.service';
import { IDCard } from './entities/id-card.entity';

@Controller('id-cards')
export class IDCardController {
  constructor(private readonly idCardService: IDCardService) {}

  @Get()
  findAll() {
    return this.idCardService.findAll();
  }

  @Post()
  create(@Body() data: Partial<IDCard>) {
    return this.idCardService.create(data);
  }
}
