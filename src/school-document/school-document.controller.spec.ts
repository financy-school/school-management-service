import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationDocumentController } from './school-document.controller';
import { OrganizationDocumentService } from './school-document.service';

describe('OrganizationDocumentController', () => {
  let controller: OrganizationDocumentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationDocumentController],
      providers: [OrganizationDocumentService],
    }).compile();

    controller = module.get<OrganizationDocumentController>(
      OrganizationDocumentController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
