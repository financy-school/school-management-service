import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolUser } from './entities/school-user.entity';
import { SchoolUserService } from './school-user.service';
import { SchoolUserController } from './school-user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolUser])],
  providers: [SchoolUserService],
  controllers: [SchoolUserController],
})
export class SchoolUserModule {}
