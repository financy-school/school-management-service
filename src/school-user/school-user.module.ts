import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolUser } from './entities/school-user.entity';
import { SchoolUserService } from './school-user.service';
import { SchoolUserController } from './school-user.controller';
import { SchoolModule } from '../school/school.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SchoolUser]),
    forwardRef(() => SchoolModule),
  ],
  providers: [SchoolUserService],
  controllers: [SchoolUserController],
  exports: [SchoolUserService],
})
export class SchoolUserModule {}
