import { Test, TestingModule } from '@nestjs/testing';
import { SchoolUserController } from './school-user.controller';
import { SchoolUserService } from './school-user.service';

describe('SchoolUserController', () => {
  let controller: SchoolUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolUserController],
      providers: [SchoolUserService],
    }).compile();

    controller = module.get<SchoolUserController>(SchoolUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
