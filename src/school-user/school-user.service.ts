import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolUser } from './entities/school-user.entity';
import * as bcrypt from 'bcrypt';
import { CreateSchoolUserDto } from './dto/create-school-user.dto';
import { customHttpError } from '../../src/core/custom-error/error-service';
import { INVALID_EMAIL_FORMAT } from '../../src/core/custom-error/error-constant';
import { INVALID_EMAIL_FORMAT_ERROR } from './error.name';
import { SchoolService } from '../school/school.service';

@Injectable()
export class SchoolUserService {
  constructor(
    @InjectRepository(SchoolUser)
    private schoolUserRepository: Repository<SchoolUser>,
    @Inject(forwardRef(() => SchoolService))
    private readonly school_service: SchoolService,
  ) {}

  findAll() {
    return this.schoolUserRepository.find({ relations: ['school'] });
  }

  findOne(id: number) {
    return this.schoolUserRepository.findOne({
      where: { id },
      relations: ['school'],
    });
  }

  async create(register_school_user_dto: CreateSchoolUserDto) {
    const {
      first_name,
      last_name,
      email,
      school_name,
      password,
      phone_number,
      role,
      address,
    } = register_school_user_dto;

    const existingUser = await this.schoolUserRepository.findOne({
      where: { email: register_school_user_dto.email },
    });

    if (existingUser) {
      throw customHttpError(
        {
          code: '10009',
          description: 'USER_ALREADY_EXISTS',
        },
        'USER_ALREADY_EXISTS_ERROR',
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (role !== 'admin' && role !== 'teacher') {
      throw new Error('Invalid role');
    }

    if (email.endsWith('@school.com') || email.includes('+')) {
      throw customHttpError(
        INVALID_EMAIL_FORMAT,
        INVALID_EMAIL_FORMAT_ERROR,
        "Email must not end with '@school.com' and must not contain '+'",
        HttpStatus.BAD_REQUEST,
      );
    }

    const school = await this.school_service.create({
      name: school_name,
      address: address,
    });

    const user = this.schoolUserRepository.create({
      first_name,
      last_name,
      email,
      password,
      phone_number,
      role,
      address,
      school,
      school_id: school.school_id,
      onboarding_status: 'pending',
    });

    return this.schoolUserRepository.save(user);
  }

  update(id: number, data: Partial<SchoolUser>) {
    return this.schoolUserRepository.update(id, data);
  }

  delete(id: number) {
    return this.schoolUserRepository.delete(id);
  }

  async validateUser(email: string, password: string) {
    const user = await this.schoolUserRepository.findOne({ where: { email } });
    if (!user) {
      throw customHttpError(
        {
          code: '10010',
          description: 'USER_NOT_FOUND',
        },
        'USER_NOT_FOUND_ERROR',
        'User with this email does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw customHttpError(
        {
          code: '10011',
          description: 'INVALID_PASSWORD',
        },
        'INVALID_PASSWORD_ERROR',
        'Invalid password',
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      ...user,
      school: await this.school_service.findOne(user.school_id),
    };
  }

  async completeOnboarding(userId: number) {
    return this.schoolUserRepository.update(userId, {
      onboarding_status: 'completed',
    });
  }
}
