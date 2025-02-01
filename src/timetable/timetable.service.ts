import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Timetable } from './entities/timetable.entity';

@Injectable()
export class TimetableService {
  constructor(
    @InjectRepository(Timetable)
    private timetableRepository: Repository<Timetable>,
  ) {}

  findAll() {
    return this.timetableRepository.find({
      relations: ['class', 'teacher', 'subject'],
    });
  }

  create(data: Partial<Timetable>) {
    return this.timetableRepository.save(data);
  }
}
