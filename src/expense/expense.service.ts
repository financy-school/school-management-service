import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { Payroll } from './entities/payroll.entity';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
    @InjectRepository(Payroll)
    private payrollRepository: Repository<Payroll>,
  ) {}

  findAllExpenses() {
    return this.expenseRepository.find();
  }

  createExpense(data: Partial<Expense>) {
    return this.expenseRepository.save(data);
  }

  findAllPayrolls() {
    return this.payrollRepository.find({ relations: ['staff'] });
  }

  createPayroll(data: Partial<Payroll>) {
    return this.payrollRepository.save(data);
  }
}
