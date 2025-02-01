import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admission } from './entities/admission.entity';

@Injectable()
export class AdmissionService {
  constructor(
    @InjectRepository(Admission)
    private admissionRepository: Repository<Admission>,
  ) {}

  findAll() {
    return this.admissionRepository.find({ relations: ['student'] });
  }

  create(data: Partial<Admission>) {
    return this.admissionRepository.save(data);
  }
}
