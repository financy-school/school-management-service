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
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  address: string;

  @Column({ default: 'admin' }) // Example roles: 'admin', 'principal', 'manager'
  role: string;

  @ManyToOne(() => SchoolEntity, (school) => school.school_id, {
    onDelete: 'CASCADE',
  })
  school: SchoolEntity;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
