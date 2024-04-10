import { Controller } from '@nestjs/common';
import { SchoolService } from './school.service';

@Controller()
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  async getSchoolsByCityName(city_name: string) {}
}
