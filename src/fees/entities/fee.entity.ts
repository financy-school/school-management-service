import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../../student/entities/student.entity';

@Entity()
export class Fee {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.student_id)
  student: Student;

  @Column()
  amount: number;

  @Column()
  paymentMethod: string; // Cash, Cheque, Online

  @Column()
  paymentDate: Date;
}
