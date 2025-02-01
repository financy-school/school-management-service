import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolUser } from './entities/school-user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SchoolUserService {
  constructor(
    @InjectRepository(SchoolUser)
    private schoolUserRepository: Repository<SchoolUser>,
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

  create(data: Partial<SchoolUser>) {
    return this.schoolUserRepository.save(data);
  }

  update(id: number, data: Partial<SchoolUser>) {
    return this.schoolUserRepository.update(id, data);
  }

  delete(id: number) {
    return this.schoolUserRepository.delete(id);
  }

  async validateUser(email: string, password: string) {
    const user = await this.schoolUserRepository.findOne({ where: { email } });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : null;
  }
}
