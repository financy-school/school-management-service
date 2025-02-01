import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Class } from '../../class/entities/class.entity';
import { Subject } from '../../subject/entities/subject.entity';
import { Exam } from '../../exam/entities/exam.entity';

@Entity()
export class ExamTimetable {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Exam, (exam) => exam.id)
  exam: Exam;

  @ManyToOne(() => Class, (classEntity) => classEntity.class_id)
  class: Class;

  @ManyToOne(() => Subject, (subject) => subject.subject_id)
  subject: Subject;

  @Column({ type: 'date' })
  examDate: string;

  @Column()
  startTime: string; // e.g., "10:00 AM"

  @Column()
  endTime: string; // e.g., "12:00 PM"
}
