import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Leave } from './entities/leave.entity';

@Injectable()
export class LeaveService {
  constructor(
    @InjectRepository(Leave)
    private leaveRepository: Repository<Leave>,
  ) {}

  findAll() {
    return this.leaveRepository.find({ relations: ['staff'] });
  }

  create(data: Partial<Leave>) {
    return this.leaveRepository.save(data);
  }

  updateStatus(id: number, status: string) {
    return this.leaveRepository.update(id, { status });
  }
}
