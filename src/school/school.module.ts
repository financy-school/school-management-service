import { forwardRef, Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { SchoolEntity } from './entities/school.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchoolUserModule } from '../school-user/school-user.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([SchoolEntity]),
    forwardRef(() => SchoolUserModule),
  ],
  controllers: [SchoolController],
  providers: [SchoolService, Repository],
  exports: [SchoolService],
})
export class SchoolModule {}
