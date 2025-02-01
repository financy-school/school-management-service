import { Test, TestingModule } from '@nestjs/testing';
import { ExamTimetableService } from './exam-timetable.service';

describe('ExamTimetableService', () => {
  let service: ExamTimetableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamTimetableService],
    }).compile();

    service = module.get<ExamTimetableService>(ExamTimetableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
