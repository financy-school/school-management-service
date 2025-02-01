import { Test, TestingModule } from '@nestjs/testing';
import { IdCardService } from './id-card.service';

describe('IdCardService', () => {
  let service: IdCardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdCardService],
    }).compile();

    service = module.get<IdCardService>(IdCardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
