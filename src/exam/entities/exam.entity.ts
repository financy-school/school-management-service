import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Class } from '../../class/entities/class.entity';
import { Subject } from '../../subject/entities/subject.entity';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Class, (classEntity) => classEntity.class_id)
  class: Class;

  @ManyToOne(() => Subject, (subject) => subject.subject_id)
  subject: Subject;

  @Column({ type: 'date' })
  date: string;

  @Column()
  duration: string; // e.g., "2 hours"

  @Column()
  totalMarks: number;
}
