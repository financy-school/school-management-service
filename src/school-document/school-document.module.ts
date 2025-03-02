import {
  Module,
  NestModule,
  MiddlewareConsumer,
  forwardRef,
} from '@nestjs/common';
import { OrganizationDocumentService } from './school-document.service';
import { OrganizationDocumentController } from './school-document.controller';
import { SchoolDocumentEntity } from './entities/school-document.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { NotificationModule } from '../client/notification/notification.module';

import { CustomHttpModule } from '../core/custom-http-service/custom-http-service.module';
import { CommonModule } from '../common/common.module';
import { SchoolModule } from '../school/school.module';
import { SchoolUserModule } from '../school-user/school-user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SchoolDocumentEntity]),
    ConfigModule,

    NotificationModule,
    CustomHttpModule,
    forwardRef(() => SchoolUserModule),
    forwardRef(() => SchoolModule),
    CommonModule,
  ],
  providers: [OrganizationDocumentService],
  controllers: [OrganizationDocumentController],
  exports: [OrganizationDocumentService],
})
export class OrganizationDocumentModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {}
}
