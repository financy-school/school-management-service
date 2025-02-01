import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamTimetable } from './entities/exam-timetable.entity';

@Injectable()
export class ExamTimetableService {
  constructor(
    @InjectRepository(ExamTimetable)
    private examTimetableRepository: Repository<ExamTimetable>,
  ) {}

  findAll() {
    return this.examTimetableRepository.find({
      relations: ['exam', 'class', 'subject'],
    });
  }

  create(data: Partial<ExamTimetable>) {
    return this.examTimetableRepository.save(data);
  }
}
