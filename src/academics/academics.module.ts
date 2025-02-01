import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Academics } from './entities/academic.entity';
import { AcademicsService } from './academics.service';
import { AcademicsController } from './academics.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Academics])],
  providers: [AcademicsService],
  controllers: [AcademicsController],
})
export class AcademicsModule {}
