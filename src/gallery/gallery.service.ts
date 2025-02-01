import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gallery } from './entities/gallery.entity';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private galleryRepository: Repository<Gallery>,
  ) {}

  findAll() {
    return this.galleryRepository.find();
  }

  create(data: Partial<Gallery>) {
    return this.galleryRepository.save(data);
  }
}
