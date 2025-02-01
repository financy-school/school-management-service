import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Payroll } from './entities/payroll.entity';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, Payroll])],
  providers: [ExpenseService],
  controllers: [ExpenseController],
})
export class ExpenseModule {}
