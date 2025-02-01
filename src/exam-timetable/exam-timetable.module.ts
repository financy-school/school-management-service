import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamTimetable } from './entities/exam-timetable.entity';
import { ExamTimetableService } from './exam-timetable.service';
import { ExamTimetableController } from './exam-timetable.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ExamTimetable])],
  providers: [ExamTimetableService],
  controllers: [ExamTimetableController],
})
export class ExamTimetableModule {}
