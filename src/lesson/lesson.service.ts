import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lesson } from './entities/lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  findAll() {
    return this.lessonRepository.find({ relations: ['subject'] });
  }

  create(data: Partial<Lesson>) {
    return this.lessonRepository.save(data);
  }
}
