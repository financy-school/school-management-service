import { Column, OneToMany, PrimaryColumn } from 'typeorm';

export class Employee {
  @PrimaryColumn({ type: 'varchar', length: 200 })
  employee_id: string;

  @Column({ type: 'varchar', length: 200 })
  firstname: string;

  @Column({ type: 'varchar', length: 200 })
  lastname: string;

  @Column({ type: 'varchar', length: 200 })
  email: string;

  @Column({ type: 'varchar', length: 200 })
  phone: string;

  @Column({ type: 'varchar', length: 200 })
  address: string;

  @Column({ type: 'varchar', length: 200 })
  city: string;

  @Column({ type: 'varchar', length: 200 })
  state: string;

  @Column({ type: 'varchar', length: 200 })
  country: string;

  @Column({ type: 'varchar', length: 200 })
  zip_code: string;

  @Column({ type: 'varchar', length: 200 })
  date_of_birth: string;

  @Column({ type: 'varchar', length: 1000 })
  father_name: string;

  @Column({ type: 'varchar', length: 1000, nullable: true, default: null })
  mother_name: string;

  @Column({ type: 'varchar', length: 1000, nullable: true, default: null })
  father_phone: string;

  @Column({ type: 'varchar', length: 1000, nullable: true, default: null })
  mother_phone: string;

  @Column({ type: 'varchar', length: 1000, nullable: true, default: null })
  father_email: string;

  @Column({ type: 'varchar', length: 1000, nullable: true, default: null })
  mother_email: string;

  @Column({ type: 'varchar', length: 1000, nullable: true, default: null })
  date_of_joining: Date;

  @Column({ type: 'varchar', length: 1000, nullable: true, default: null })
  date_of_leaving: Date;

  @Column({ type: 'varchar', length: 1000, nullable: true, default: null })
  type_of_employment: string;

  @Column({ type: 'varchar', length: 1000, nullable: true, default: null })
  employee_role: string;

  @Column({ type: 'varchar', length: 1000, nullable: true, default: null })
  employee_department: string;

  @Column({ type: 'varchar', length: 1000, nullable: true, default: null })
  employee_designation: string;
}
