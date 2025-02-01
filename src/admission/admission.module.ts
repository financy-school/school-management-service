import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admission } from './entities/admission.entity';
import { AdmissionService } from './admission.service';
import { AdmissionController } from './admission.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Admission])],
  providers: [AdmissionService],
  controllers: [AdmissionController],
})
export class AdmissionModule {}
