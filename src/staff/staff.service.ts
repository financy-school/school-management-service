import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
  ) {}

  findAll() {
    return this.staffRepository.find({ relations: ['role'] });
  }

  create(data: Partial<Staff>) {
    return this.staffRepository.save(data);
  }

  bulkCreate(data: Partial<Staff>[]) {
    return this.staffRepository.save(data);
  }
}
