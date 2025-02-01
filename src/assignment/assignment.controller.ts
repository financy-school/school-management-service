import { Controller, Get, Post, Body } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { Assignment, AssignmentSubmission } from './entities/assignment.entity';

@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Get()
  findAllAssignments() {
    return this.assignmentService.findAllAssignments();
  }

  @Post()
  createAssignment(@Body() data: Partial<Assignment>) {
    return this.assignmentService.createAssignment(data);
  }

  @Post('submit')
  submitAssignment(@Body() data: Partial<AssignmentSubmission>) {
    return this.assignmentService.submitAssignment(data);
  }
}
