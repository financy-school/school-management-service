import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Subject } from '../../subject/entities/subject.entity';
import { Student } from '../../student/entities/student.entity';

@Entity()
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Subject, (subject) => subject.assignments)
  @Column({ type: 'varchar', length: 200 })
  subject: Subject;

  @Column()
  description: string;

  @Column()
  dueDate: string;

  @OneToMany(() => AssignmentSubmission, (submission) => submission.assignment)
  submissions: AssignmentSubmission[];
}

@Entity()
export class AssignmentSubmission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Assignment, (assignment) => assignment.submissions)
  assignment: Assignment;

  @ManyToOne(() => Student, (student) => student.assignmentSubmissions)
  student: Student;

  @Column()
  submissionDate: string;

  @Column()
  score: number;
}
