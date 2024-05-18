import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SchoolModule } from './school/school.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { TransportationModule } from './transportation/transportation.module';
import { SubjectModule } from './subject/subject.module';
import { AuthModule } from './auth/auth.module';
import { EmployeeModule } from './employee/employee.module';
import { TeacherSubjectModule } from './teacher-subject/teacher-subject.module';
import { ClassModule } from './class/class.module';
import { CommonModule } from './common/common.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    SchoolModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'mysql',
          host: config.get('DB_HOST'),
          port: config.get('DB_PORT'),
          username: config.get('DB_USERNAME'),
          password: config.get('DB_PASSWORD'),
          database: config.get('DB_DATABASE'),
          entities: ['dist/**/**.entity{.ts,.js}'],
          synchronize: config.get('DB_SYNC'),
          logging: true,
        };
      },
    }),
    StudentModule,
    TeacherModule,
    TransportationModule,
    SubjectModule,
    AuthModule,
    EmployeeModule,
    TeacherSubjectModule,
    ClassModule,
    CommonModule,
    SchoolModule,
  ],
})
export class AppModule {}
