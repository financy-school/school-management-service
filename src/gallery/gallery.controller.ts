import { Controller, Get, Post, Body } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { Gallery } from './entities/gallery.entity';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Get()
  findAll() {
    return this.galleryService.findAll();
  }

  @Post()
  create(@Body() data: Partial<Gallery>) {
    return this.galleryService.create(data);
  }
}
