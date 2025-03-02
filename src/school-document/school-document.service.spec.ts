import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationDocumentService } from './school-document.service';

describe('OrganizationDocumentService', () => {
  let service: OrganizationDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationDocumentService],
    }).compile();

    service = module.get<OrganizationDocumentService>(
      OrganizationDocumentService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
