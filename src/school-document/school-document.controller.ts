import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Query,
  Delete,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { OrganizationDocumentService } from './school-document.service';
import { CreateOrganizationDocumentDto } from './dto/create-school-document.dto';
import {
  RemoveOrganizationDocumentDto,
  UpdateOrganizationDocumentDto,
} from './dto/update-school-document.dto';
import { UploadOrganizationDocumentDto } from './dto/upload-school-document.dto';
import { DownloadOrganizationDocumentDto } from './dto/download-school-document.dto';

@Controller('organization-document')
export class OrganizationDocumentController {
  constructor(
    private readonly organization_document_service: OrganizationDocumentService,
  ) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(
    school_id: string,
    @Body()
    create_organization_document_dto: CreateOrganizationDocumentDto,
  ) {
    return this.organization_document_service.create(
      school_id,
      create_organization_document_dto,
    );
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll(school_id: string, @Query() query: object) {
    return this.organization_document_service.findAll(school_id, query);
  }

  @Get(':school_document_id')
  async findOne(
    school_id: string,
    @Param('school_document_id') school_document_id: string,
    @Query('expire_in') expire_in: number,
  ) {
    return this.organization_document_service.findOne(
      school_id,
      school_document_id,
      expire_in,
    );
  }

  @Get(':org_document_id/find-one-by-id')
  async findOneById(
    school_document_id: string,
    @Query('expire_in') expire_in: number,
  ) {
    return this.organization_document_service.findOneById(
      school_document_id,
      expire_in,
    );
  }

  @Patch(':school_document_id')
  @UseInterceptors(ClassSerializerInterceptor)
  async update(
    school_id: string,
    @Param('school_document_id') school_document_id: string,
    @Body()
    update_organization_document_dto: UpdateOrganizationDocumentDto,
  ) {
    return this.organization_document_service.update(
      school_id,
      school_document_id,
      update_organization_document_dto,
    );
  }

  @Delete(':org_document_id')
  @UseInterceptors(ClassSerializerInterceptor)
  async delete(
    school_id: string,
    @Param('org_document_id') school_document_id: string,
  ) {
    return this.organization_document_service.delete(
      school_id,
      school_document_id,
    );
  }

  @Patch(':org_document_id/get-reupload-url')
  @UseInterceptors(ClassSerializerInterceptor)
  async getReuploadUrl(
    school_id: string,
    @Param('org_document_id') org_document_id: string,
    @Body() body: CreateOrganizationDocumentDto,
  ) {
    return this.organization_document_service.getReuploadUrl(
      org_document_id,
      school_id,
      body,
    );
  }
}
