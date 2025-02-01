import { Controller, Get, Post, Body } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { Expense } from './entities/expense.entity';
import { Payroll } from './entities/payroll.entity';

@Controller('expenses')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  findAllExpenses() {
    return this.expenseService.findAllExpenses();
  }

  @Post()
  createExpense(@Body() data: Partial<Expense>) {
    return this.expenseService.createExpense(data);
  }

  @Get('payroll')
  findAllPayrolls() {
    return this.expenseService.findAllPayrolls();
  }

  @Post('payroll')
  createPayroll(@Body() data: Partial<Payroll>) {
    return this.expenseService.createPayroll(data);
  }
}
