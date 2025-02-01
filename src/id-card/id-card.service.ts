import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDCard } from './entities/id-card.entity';

@Injectable()
export class IDCardService {
  constructor(
    @InjectRepository(IDCard)
    private idCardRepository: Repository<IDCard>,
  ) {}

  findAll() {
    return this.idCardRepository.find({ relations: ['student'] });
  }

  create(data: Partial<IDCard>) {
    return this.idCardRepository.save(data);
  }
}
