import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slider } from './entities/slider.entity';

@Injectable()
export class SliderService {
  constructor(
    @InjectRepository(Slider)
    private sliderRepository: Repository<Slider>,
  ) {}

  findAll() {
    return this.sliderRepository.find();
  }

  create(data: Partial<Slider>) {
    return this.sliderRepository.save(data);
  }
}
