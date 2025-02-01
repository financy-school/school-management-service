import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Staff } from '../../staff/entities/staff.entity';

@Entity()
export class Leave {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Staff, (staff) => staff.id)
  staff: Staff;

  @Column()
  leaveType: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ default: 'Pending' })
  status: string; // Pending, Approved, Rejected
}
