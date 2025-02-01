import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Class } from '../../class/entities/class.entity';
import { Teacher } from '../../teacher/entities/teacher.entity';
import { Subject } from '../../subject/entities/subject.entity';

@Entity()
export class Timetable {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Class, (classEntity) => classEntity.class_id)
  class: Class;

  @ManyToOne(() => Teacher, (teacher) => teacher.id)
  teacher: Teacher;

  @ManyToOne(() => Subject, (subject) => subject.subject_id)
  subject: Subject;

  @Column()
  day: string; // Monday, Tuesday, etc.

  @Column()
  startTime: string;

  @Column()
  endTime: string;
}
