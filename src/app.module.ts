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
import { SchoolEntity } from './school/entities/school.entity';
import { Teacher } from './teacher/entities/teacher.entity';
import { Subject } from './subject/entities/subject.entity';
import { AuthEntity } from './auth/entities/auth.entity';
import { Transportation } from './transportation/entities/transportation.entity';
import { Class } from './class/entities/class.entity';
import { Student } from './student/entities/student.entity';
import { TeacherSubject } from './teacher-subject/entities/teacher-subject.entity';
import { GuardianModule } from './guardian/guardian.module';
import { AdmissionModule } from './admission/admission.module';
import { AcademicsModule } from './academics/academics.module';
import { SliderModule } from './slider/slider.module';
import { TimetableModule } from './timetable/timetable.module';
import { AttendanceModule } from './attendance/attendance.module';
import { ExamModule } from './exam/exam.module';
import { LessonModule } from './lesson/lesson.module';
import { AssignmentModule } from './assignment/assignment.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { RoleModule } from './role/role.module';
import { StaffModule } from './staff/staff.module';
import { ExpenseModule } from './expense/expense.module';
import { LeaveModule } from './leave/leave.module';
import { FeeModule } from './fees/fees.module';
import { GalleryModule } from './gallery/gallery.module';
import { CertificateModule } from './certificate/certificate.module';
import { IdCardModule } from './id-card/id-card.module';
import { ExamTimetableModule } from './exam-timetable/exam-timetable.module';
import {
  Assignment,
  AssignmentSubmission,
} from './assignment/entities/assignment.entity';
import { Lesson } from './lesson/entities/lesson.entity';
import { ExamTimetable } from './exam-timetable/entities/exam-timetable.entity';
import { Admission } from './admission/entities/admission.entity';
import { Attendance } from './attendance/entities/attendance.entity';
import { Guardian } from './guardian/entities/guardian.entity';
import { Exam } from './exam/entities/exam.entity';
import { SchoolUserModule } from './school-user/school-user.module';
import { SchoolUser } from './school-user/entities/school-user.entity';

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
          entities: [
            SchoolEntity,
            Teacher,
            Subject,
            AuthEntity,
            Transportation,
            Class,
            Student,
            TeacherSubject,
            AssignmentSubmission,
            Assignment,
            Lesson,
            ExamTimetable,
            Admission,
            Attendance,
            Guardian,
            Exam,
            SchoolUser,
          ],
          // synchronize: config.get('DB_SYNC'),
          synchronize: true,
          logging: ['query', 'schema'],
        };
      },
    }),
    AssignmentModule,
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
    GuardianModule,
    AdmissionModule,
    LessonModule,
    AcademicsModule,
    SliderModule,
    TimetableModule,
    AttendanceModule,
    ExamModule,
    LessonModule,
    AssignmentModule,
    AnnouncementModule,
    RoleModule,
    StaffModule,
    ExpenseModule,
    LeaveModule,
    FeeModule,
    GalleryModule,
    CertificateModule,
    IdCardModule,
    ExamTimetableModule,
    SubjectModule,
    ExamModule,
    AdmissionModule,
    AttendanceModule,
    GuardianModule,
    SchoolUserModule,
  ],
})
export class AppModule {}
