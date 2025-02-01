import { Controller, Get, Post, Body } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { Announcement } from './entities/announcement.entity';

@Controller('announcements')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Get()
  findAll() {
    return this.announcementService.findAll();
  }

  @Post()
  create(@Body() data: Partial<Announcement>) {
    return this.announcementService.create(data);
  }
}
