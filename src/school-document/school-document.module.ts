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

import { NotificationModule } from '../../src/client/notification/notification.module';

import { CustomHttpModule } from '../../src/core/custom-http-service/custom-http-service.module';
import { CommonModule } from '../../src/common/common.module';
import { SchoolModule } from '../../src/school/school.module';
import { SchoolUserModule } from '../../src/school-user/school-user.module';

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
