import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employee_repository: Repository<Employee>, // Fixed naming convention
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const {
      firstName,
      lastName,
      email,
      phone,
      role,
      address,
      dateOfJoining,
      designation,
      school_id,
    } = createEmployeeDto;

    const newEmployee = new Employee();
    newEmployee.employee_id = `employee_${Math.random().toString(36).substring(7)}`;
    newEmployee.firstname = firstName;
    newEmployee.lastname = lastName;
    newEmployee.email = email;
    newEmployee.phone = phone;
    newEmployee.employee_role = role;
    newEmployee.address = address;
    newEmployee.date_of_joining = dateOfJoining;
    newEmployee.employee_designation = designation;
    newEmployee.school_id = school_id;

    return await this.employee_repository.save(newEmployee);
  }

  async findAll() {
    return await this.employee_repository.find();
  }

  async findOne(employee_id: string) {
    return await this.employee_repository.findOne({ where: { employee_id } });
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
