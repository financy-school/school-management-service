import { Module } from '@nestjs/common';
import { IDCardService } from './id-card.service';
import { IDCardController } from './id-card.controller';
import { IDCard } from './entities/id-card.entity';
import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([IDCard])],
  controllers: [IDCardController],
  providers: [IDCardService, Repository],
})
export class IdCardModule {}
