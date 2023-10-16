export interface UserMoneySpending {
  money: number;
  date: Date | string;
  account: string;
  expenseType: string;
  ID: string;
}

export interface Investing extends UserMoneySpending {
  coins?: string;
  typeOfInvesting?: string;
}

export interface Expense extends UserMoneySpending {
  companyName?: string;
  billStatus?: string;
}

export interface Saveings extends UserMoneySpending {
  typeOfSavings?: string;
}
