import { Controller, Get, Post, Body } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { Certificate } from './entities/certificate.entity';

@Controller('certificates')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Get()
  findAll() {
    return this.certificateService.findAll();
  }

  @Post()
  create(@Body() data: Partial<Certificate>) {
    return this.certificateService.create(data);
  }
}
