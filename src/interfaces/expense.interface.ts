export interface Expense {
  expenseType: string;
  date: Date | string;
  money: number;
  companyName?: string;
  billStatus?: string;
  account: string;
  ID: string;
}
