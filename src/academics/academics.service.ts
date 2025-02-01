import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Academics } from '../academics/entities/academic.entity';

@Injectable()
export class AcademicsService {
  constructor(
    @InjectRepository(Academics)
    private academicsRepository: Repository<Academics>,
  ) {}

  findAll() {
    return this.academicsRepository.find();
  }

  create(data: Partial<Academics>) {
    return this.academicsRepository.save(data);
  }
}
