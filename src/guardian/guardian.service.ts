import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guardian } from './entities/guardian.entity';

@Injectable()
export class GuardianService {
  constructor(
    @InjectRepository(Guardian)
    private guardianRepository: Repository<Guardian>,
  ) {}

  findAll() {
    return this.guardianRepository.find({ relations: ['student'] });
  }

  create(data: Partial<Guardian>) {
    return this.guardianRepository.save(data);
  }
}
