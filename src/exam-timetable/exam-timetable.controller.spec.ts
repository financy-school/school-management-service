import { Test, TestingModule } from '@nestjs/testing';
import { ExamTimetableController } from './exam-timetable.controller';
import { ExamTimetableService } from './exam-timetable.service';

describe('ExamTimetableController', () => {
  let controller: ExamTimetableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamTimetableController],
      providers: [ExamTimetableService],
    }).compile();

    controller = module.get<ExamTimetableController>(ExamTimetableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
