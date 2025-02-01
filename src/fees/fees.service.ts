import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fee } from './entities/fee.entity';

@Injectable()
export class FeeService {
  constructor(
    @InjectRepository(Fee)
    private feeRepository: Repository<Fee>,
  ) {}

  findAll() {
    return this.feeRepository.find({ relations: ['student'] });
  }

  create(data: Partial<Fee>) {
    return this.feeRepository.save(data);
  }
}
