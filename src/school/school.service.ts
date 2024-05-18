import { HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SchoolEntity } from './entities/school.entity';
import { customHttpError } from 'src/core/custom-error/error-service';
import { SCHOOL_NOT_FOUND_ERROR } from './error.name';
import { SCHOOL_NOT_FOUND } from 'src/core/custom-error/error-constant';

@Injectable()
export class SchoolService {
  constructor(private readonly school_repository: Repository<SchoolEntity>) {}
  async findOne(school_id: string) {
    const school = await this.school_repository.findOneBy({
      school_id: school_id,
    });
    if (!school) {
      throw customHttpError(
        SCHOOL_NOT_FOUND,
        SCHOOL_NOT_FOUND_ERROR,
        `School with id ${school_id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
    return school;
  }
}
