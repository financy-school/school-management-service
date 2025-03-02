import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SchoolEntity } from './entities/school.entity';
import { customHttpError } from '../core/custom-error/error-service';
import {
  SCHOOL_ALREADY_EXISTS_ERROR,
  SCHOOL_NOT_FOUND_ERROR,
} from './error.name';
import {
  SCHOOL_ALREADY_EXISTS,
  SCHOOL_NOT_FOUND,
} from '../core/custom-error/error-constant';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from './dto/create-school.dto';
import { SchoolUserService } from '../school-user/school-user.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(SchoolEntity)
    private readonly schoolRepository: Repository<SchoolEntity>,
    @Inject(forwardRef(() => SchoolUserService))
    private readonly school_user_service: SchoolUserService,
  ) {}

  async create(school: School): Promise<SchoolEntity> {
    const {
      name,
      address,
      phone,
      registration_number,
      email,
      city,
      country,
      state,
      website,
    } = school;

    const newSchool = new SchoolEntity();
    newSchool.school_id = `school_${uuidv4()}`; // Generate a random school_id
    newSchool.name = name;
    newSchool.address = address;
    newSchool.phone = phone;
    newSchool.registration_number = registration_number;
    newSchool.email = email;
    newSchool.city = city;
    newSchool.country = country;
    newSchool.state = state;
    newSchool.website = website;

    return await this.schoolRepository.save(newSchool); // Create a new school
  }

  async findAll(): Promise<SchoolEntity[]> {
    return await this.schoolRepository.find(); // Fetch all schools
  }

  async findOne(school_id: string) {
    const school = await this.schoolRepository.findOneBy({
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

  async update(school_id: string, school: School): Promise<SchoolEntity> {
    const {
      name,
      address,
      phone,
      registration_number,
      email,
      city,
      country,
      state,
      website,
    } = school;

    const existingSchool = await this.schoolRepository.findOneBy({
      school_id: school_id,
    });

    if (!existingSchool) {
      throw customHttpError(
        SCHOOL_NOT_FOUND,
        SCHOOL_NOT_FOUND_ERROR,
        `School with id ${school_id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    existingSchool.name = name;
    existingSchool.address = address;
    existingSchool.phone = phone;
    existingSchool.registration_number = registration_number;
    existingSchool.email = email;
    existingSchool.city = city;
    existingSchool.country = country;
    existingSchool.state = state;
    existingSchool.website = website;

    return await this.schoolRepository.save(existingSchool);
  }
}
