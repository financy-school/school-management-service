import { Test, TestingModule } from '@nestjs/testing';
import { SchoolUserService } from './school-user.service';

describe('SchoolUserService', () => {
  let service: SchoolUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SchoolUserService],
    }).compile();

    service = module.get<SchoolUserService>(SchoolUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
