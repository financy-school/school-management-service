import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryColumn({ type: 'varchar', length: 200 })
  employee_id: string; // Primary key as a UUID

  @Column({ type: 'varchar', length: 200 })
  firstname: string;

  @Column({ type: 'varchar', length: 200 })
  lastname: string;

  @Column({ type: 'varchar', length: 200, unique: true })
  email: string; // Email is unique

  @Column({ type: 'varchar', length: 15 })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  state?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  country?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  zip_code?: string;

  @Column({ type: 'date', nullable: true })
  date_of_birth?: Date;

  @Column({ type: 'varchar', length: 200 })
  father_name: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  mother_name?: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  father_phone?: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  mother_phone?: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  father_email?: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  mother_email?: string;

  @Column({ type: 'date', nullable: true })
  date_of_joining?: Date;

  @Column({ type: 'date', nullable: true })
  date_of_leaving?: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  type_of_employment?: string; // E.g., full-time, part-time, etc.

  @Column({ type: 'varchar', length: 100, nullable: true })
  employee_role?: string; // E.g., admin, manager, staff

  @Column({ type: 'varchar', length: 100, nullable: true })
  employee_department?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  employee_designation?: string;

  @Column({ type: 'varchar', length: 200 })
  school_id: string; // Foreign key to the school
}
