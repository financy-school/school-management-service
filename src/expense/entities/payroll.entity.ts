import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Staff } from '../../staff/entities/staff.entity';

@Entity()
export class Payroll {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Staff, (staff) => staff.id)
  staff: Staff;

  @Column()
  salary: number;

  @Column()
  allowances: number;

  @Column()
  deductions: number;

  @Column()
  netPay: number;

  @Column()
  date: Date;
}
