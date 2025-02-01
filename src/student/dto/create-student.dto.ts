import { IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  student_id: string;
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  full_name: string;

  @IsNotEmpty()
  school_id: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  zip_code: string;

  @IsNotEmpty()
  date_of_birth: string;

  @IsNotEmpty()
  father_name: string;

  @IsNotEmpty()
  mother_name: string;

  @IsNotEmpty()
  father_phone: string;

  @IsNotEmpty()
  mother_phone: string;

  @IsNotEmpty()
  father_email: string;

  @IsNotEmpty()
  mother_email: string;

  @IsNotEmpty()
  father_occupation: string;

  @IsNotEmpty()
  mother_occupation: string;

  @IsNotEmpty()
  guardian_name: string;

  @IsNotEmpty()
  guardian_phone: string;

  @IsNotEmpty()
  guardian_email: string;

  @IsNotEmpty()
  guardian_occupation: string;
}

// export class Student {
//   @PrimaryColumn({ type: 'varchar', length: 200 })
//   student_id: string;

//   @Column({ type: 'varchar', length: 200 })
//   first_name: string;

//   @Column({ type: 'varchar', length: 200 })
//   last_name: string;

//   @Column({ type: 'varchar', length: 200 })
//   email: string;

//   @Column({ type: 'varchar', length: 200 })
//   phone: string;

//   @Column({ type: 'varchar', length: 200 })
//   address: string;

//   @Column({ type: 'varchar', length: 200 })
//   city: string;

//   @Column({ type: 'varchar', length: 200 })
//   state: string;

//   @Column({ type: 'varchar', length: 200 })
//   country: string;

//   @Column({ type: 'varchar', length: 200 })
//   zip_code: string;

//   @Column({ type: 'varchar', length: 200 })
//   date_of_birth: string;

//   @Column({ type: 'varchar', length: 1000 })
//   father_name: string;

//   @Column({ type: 'varchar', length: 1000 })
//   mother_name: string;

//   @Column({ type: 'varchar', length: 1000 })
//   father_phone: string;

//   @Column({ type: 'varchar', length: 1000 })
//   mother_phone: string;

//   @Column({ type: 'varchar', length: 1000 })
//   father_email: string;

//   @Column({ type: 'varchar', length: 1000 })
//   mother_email: string;

//   @Column({ type: 'varchar', length: 1000 })
//   father_occupation: string;

//   @Column({ type: 'varchar', length: 1000 })
//   mother_occupation: string;

//   @Column({ type: 'varchar', length: 1000 })
//   guardian_name: string;

//   @Column({ type: 'varchar', length: 1000 })
//   guardian_phone: string;

//   @Column({ type: 'varchar', length: 1000 })
//   guardian_email: string;

//   @Column({ type: 'varchar', length: 1000 })
//   guardian_occupation: string;

//   @Column({ type: 'varchar', length: 200 })
//   school_id: string;
