import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment, AssignmentSubmission } from './entities/assignment.entity';

@Injectable()
export class AssignmentService {
  constructor(
    @InjectRepository(Assignment)
    private assignmentRepository: Repository<Assignment>,
    @InjectRepository(AssignmentSubmission)
    private submissionRepository: Repository<AssignmentSubmission>,
  ) {}

  findAllAssignments() {
    return this.assignmentRepository.find({ relations: ['subject'] });
  }

  createAssignment(data: Partial<Assignment>) {
    return this.assignmentRepository.save(data);
  }

  submitAssignment(data: Partial<AssignmentSubmission>) {
    return this.submissionRepository.save(data);
  }
}
