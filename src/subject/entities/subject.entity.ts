import { Lesson } from '../../lesson/entities/lesson.entity';
import { Assignment } from '../../assignment/entities/assignment.entity';
import { PrimaryColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity('subject')
export class Subject {
  @PrimaryColumn({ type: 'varchar', length: 200 })
  subject_id: string;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @Column({ type: 'varchar', length: 200 })
  subject_code: string;

  @Column({ type: 'varchar', length: 200 })
  credit_hours: string;

  @Column({ type: 'varchar', length: 200 })
  semester: string;

  @Column({ type: 'varchar', length: 200 })
  department: string;

  @Column({ type: 'varchar', length: 200 })
  school_id: string;

  @OneToMany(() => Assignment, (assignment) => assignment.subject)
  assignments: Assignment[];

  @OneToMany(() => Lesson, (lesson) => lesson.subject)
  lessons: Lesson[];
}
