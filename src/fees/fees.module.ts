import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fee } from './entities/fee.entity';
import { FeeService } from './fees.service';
import { FeeController } from './fees.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Fee])],
  providers: [FeeService],
  controllers: [FeeController],
})
export class FeeModule {}
