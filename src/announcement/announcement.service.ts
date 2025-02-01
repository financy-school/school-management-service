import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Announcement } from './entities/announcement.entity';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(Announcement)
    private announcementRepository: Repository<Announcement>,
  ) {}

  findAll() {
    return this.announcementRepository.find();
  }

  create(data: Partial<Announcement>) {
    return this.announcementRepository.save({ ...data, createdAt: new Date() });
  }
}
