import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './entities/exam.entity';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
  ) {}

  findAll() {
    return this.examRepository.find({ relations: ['class', 'subject'] });
  }

  create(data: Partial<Exam>) {
    return this.examRepository.save(data);
  }
}
