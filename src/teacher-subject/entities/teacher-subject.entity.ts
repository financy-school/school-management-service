import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity('teacher_subject')
export class TeacherSubject {
  @PrimaryColumn({ type: 'varchar', length: 200 })
  teacher_subject_id: string;

  @Column({ type: 'varchar', length: 200 })
  teacher_id: string;

  @Column({ type: 'varchar', length: 200 })
  subject_id: string;

  @Column({ type: 'varchar', length: 200 })
  school_id: string;

  @Column({ type: 'varchar', length: 200 })
  class_id: string;
}
