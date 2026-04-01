export interface Customer {
  _id: string;
  image: string;
  name: string;
  email: string;
  spent: string;
  phone: string;
  address: string;
  register_date: string;
}

export interface IncomeExpense {
  _id: string;
  name: string;
  amount: number;
  type: ['Income', 'Expense', 'Error'];
}

export interface StatisticsResponse {
  status: number;
  message: string;
  data: {
    products: number;
    suppliers: number;
    customers: number;
    recentlyCustomers: Customer[];
    incomeExpense: IncomeExpense[];
  };
}
