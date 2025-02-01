import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Subject } from '../../subject/entities/subject.entity';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Subject, (subject) => subject.lessons)
  subject: Subject;

  @Column()
  description: string;
}
