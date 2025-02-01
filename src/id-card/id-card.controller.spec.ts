import { Test, TestingModule } from '@nestjs/testing';
import { IdCardController } from './id-card.controller';
import { IdCardService } from './id-card.service';

describe('IdCardController', () => {
  let controller: IdCardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdCardController],
      providers: [IdCardService],
    }).compile();

    controller = module.get<IdCardController>(IdCardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
