import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignment, AssignmentSubmission } from './entities/assignment.entity';
import { AssignmentService } from './assignment.service';
import { AssignmentController } from './assignment.controller';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, AssignmentSubmission])],
  providers: [AssignmentService, Repository],
  controllers: [AssignmentController],
})
export class AssignmentModule {}
