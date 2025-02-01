import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../../student/entities/student.entity';

@Entity()
export class Certificate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.student_id)
  student: Student;

  @Column()
  certificateType: string;

  @Column()
  issueDate: Date;
}
