import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../../student/entities/student.entity';

@Entity()
export class IDCard {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.student_id)
  student: Student;

  @Column()
  issueDate: Date;

  @Column()
  expiryDate: Date;
}
