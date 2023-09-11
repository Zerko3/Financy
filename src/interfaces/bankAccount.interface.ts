import { Expense } from './expense.interface';

export interface BankAccount {
  // TODO:
  // 1. If better name ideas refactor
  bankMoneyStatus: number;
  bankAccountValidDate: Date;
  bankAccountCard: string;
  bankAccountName: string;
  bankAccountCustomName: string;
  ID: string;
  expenseOnCard: any[];
}
