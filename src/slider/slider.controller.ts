import { Controller, Get, Post, Body } from '@nestjs/common';
import { SliderService } from './slider.service';
import { Slider } from './entities/slider.entity';

@Controller('sliders')
export class SliderController {
  constructor(private readonly sliderService: SliderService) {}

  @Get()
  findAll() {
    return this.sliderService.findAll();
  }

  @Post()
  create(@Body() data: Partial<Slider>) {
    return this.sliderService.create(data);
  }
}
