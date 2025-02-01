import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
  ) {}

  findAll() {
    return this.attendanceRepository.find({ relations: ['student'] });
  }

  markAttendance(data: Partial<Attendance>) {
    return this.attendanceRepository.save(data);
  }
}
