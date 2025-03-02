import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { SchoolEntity } from '../../school/entities/school.entity';
import * as bcrypt from 'bcrypt';

@Entity()
export class SchoolUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone_number: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: 'admin' }) // Example roles: 'admin', 'principal', 'manager'
  role: string;

  @ManyToOne(() => SchoolEntity, (school) => school.school_id, {
    onDelete: 'CASCADE',
  })
  school: SchoolEntity;

  // school_id: string
  @Column()
  school_id: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({ default: 'pending' })
  onboarding_status: string;
}
