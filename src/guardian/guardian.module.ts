import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guardian } from './entities/guardian.entity';
import { GuardianService } from './guardian.service';
import { GuardianController } from './guardian.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Guardian])],
  providers: [GuardianService],
  controllers: [GuardianController],
})
export class GuardianModule {}
