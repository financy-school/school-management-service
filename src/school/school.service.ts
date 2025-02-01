import { HttpStatus, Injectable } from '@nestjs/common';
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

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(SchoolEntity)
    private readonly schoolRepository: Repository<SchoolEntity>, // Fixed naming convention
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

    // Check if school with the same registration number already exists
    const existingSchool = await this.schoolRepository.findOneBy({
      registration_number: registration_number,
    });

    if (existingSchool) {
      throw customHttpError(
        SCHOOL_ALREADY_EXISTS,
        SCHOOL_ALREADY_EXISTS_ERROR,
        `School with registration number ${registration_number} already exists.`,
        HttpStatus.CONFLICT,
      );
    }

    // Create a new school
    const newSchool = new SchoolEntity();
    newSchool.school_id = `school_${Math.random().toString(36).substring(20)}`; // Generate a random school_id
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
}
