import { Attendance } from '../../attendance/entities/attendance.entity';
import { Admission } from '../../admission/entities/admission.entity';
import { AssignmentSubmission } from '../../assignment/entities/assignment.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Guardian } from '../../guardian/entities/guardian.entity';

@Entity('student')
export class Student {
  @PrimaryColumn({ type: 'varchar', length: 200 })
  student_id: string;

  @Column({ type: 'varchar', length: 200 })
  first_name: string;

  @Column({ type: 'varchar', length: 200 })
  last_name: string;

  @Column({ type: 'varchar', length: 200 })
  email: string;

  @Column({ type: 'varchar', length: 200 })
  phone: string;

  @Column({ type: 'varchar', length: 200 })
  address: string;

  @Column({ type: 'varchar', length: 200 })
  city: string;

  @Column({ type: 'varchar', length: 200 })
  state: string;

  @Column({ type: 'varchar', length: 200 })
  country: string;

  @Column({ type: 'varchar', length: 200 })
  zip_code: string;

  @Column({ type: 'varchar', length: 200 })
  date_of_birth: string;

  @Column({ type: 'varchar', length: 1000 })
  father_name: string;

  @Column({ type: 'varchar', length: 1000 })
  mother_name: string;

  @Column({ type: 'varchar', length: 1000 })
  father_phone: string;

  @Column({ type: 'varchar', length: 1000 })
  mother_phone: string;

  @Column({ type: 'varchar', length: 1000 })
  father_email: string;

  @Column({ type: 'varchar', length: 1000 })
  mother_email: string;

  @Column({ type: 'varchar', length: 1000 })
  father_occupation: string;

  @Column({ type: 'varchar', length: 1000 })
  mother_occupation: string;

  @Column({ type: 'varchar', length: 1000 })
  guardian_name: string;

  @Column({ type: 'varchar', length: 1000 })
  guardian_phone: string;

  @Column({ type: 'varchar', length: 1000 })
  guardian_email: string;

  @Column({ type: 'varchar', length: 1000 })
  guardian_occupation: string;

  @Column({ type: 'varchar', length: 200 })
  school_id: string;

  @OneToMany(() => AssignmentSubmission, (submission) => submission.student)
  assignmentSubmissions: AssignmentSubmission[];

  @OneToMany(() => Admission, (admission) => admission.student)
  admissions: Admission[];

  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendances: Attendance[];

  @OneToMany(() => Guardian, (guardian) => guardian.student)
  guardians: Guardian[];
}
