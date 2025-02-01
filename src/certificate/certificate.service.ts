import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Certificate } from './entities/certificate.entity';

@Injectable()
export class CertificateService {
  constructor(
    @InjectRepository(Certificate)
    private certificateRepository: Repository<Certificate>,
  ) {}

  findAll() {
    return this.certificateRepository.find({ relations: ['student'] });
  }

  create(data: Partial<Certificate>) {
    return this.certificateRepository.save(data);
  }
}
