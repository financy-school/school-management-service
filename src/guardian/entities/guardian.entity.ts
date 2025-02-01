import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../../student/entities/student.entity';

@Entity()
export class Guardian {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  relation: string;

  @Column()
  contactNumber: string;

  @Column({ nullable: true })
  email?: string;

  @ManyToOne(() => Student, (student) => student.guardians)
  student: Student;
}
