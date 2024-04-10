import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolModule } from './school/school.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [SchoolModule],
})
export class AppModule {}
