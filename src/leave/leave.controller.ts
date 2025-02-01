import { Controller, Get, Post, Patch, Body, Param } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { Leave } from './entities/leave.entity';

@Controller('leaves')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Get()
  findAll() {
    return this.leaveService.findAll();
  }

  @Post()
  create(@Body() data: Partial<Leave>) {
    return this.leaveService.create(data);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: number, @Body('status') status: string) {
    return this.leaveService.updateStatus(id, status);
  }
}
