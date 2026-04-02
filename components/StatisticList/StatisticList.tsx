'use client';
import css from './StatisticList.module.css';
import { Customer } from '@/types/statistics';
import { IncomeExpense } from '@/types/statistics';

interface StatisticListProps {
  statistics: {
    products: number;
    suppliers: number;
    customers: number;
    recentlyCustomers: Customer[];
    incomeExpense: IncomeExpense[];
  };
}

export default function StatisticList({ statistics }: StatisticListProps) {
  const getTypeClass = (type: string) => {
    switch (type) {
      case 'Income':
        return css.income_type;
      case 'Expense':
        return css.expense_type;
      case 'Error':
        return css.error_type;
      default:
        return '';
    }
  };

  const getAmountClass = (type: string) => {
    switch (type) {
      case 'Income':
        return css.income_amount;
      case 'Expense':
        return css.expense_amount;
      case 'Error':
        return css.error_amount;
      default:
        return '';
    }
  };

  return (
    <div className={css.statistic}>
      <h2 className={css.statistic_title}>Statistics</h2>
      <div className={css.statistic_numbers}>
        <div className={css.statistic_all}>
          <div className={css.inner_box}>
            <svg className={css.statistic_icon} width={18} height={18}>
              <use href="/sprite.svg#icon-cash" />
            </svg>
            <p className={css.statistic_text}>All products</p>
          </div>
          <p className={css.statistics_count}>{statistics.products}</p>
        </div>
        <div className={css.statistic_all}>
          <div className={css.inner_box}>
            <svg className={css.statistic_icon} width={18} height={18}>
              <use href="/sprite.svg#icon-cash" />
            </svg>
            <p className={css.statistic_text}>All suppliers</p>
          </div>
          <p className={css.statistics_count}>{statistics.suppliers}</p>
        </div>
        <div className={css.statistic_all}>
          <div className={css.inner_box}>
            <svg className={css.statistic_icon} width={18} height={18}>
              <use href="/sprite.svg#icon-users" />
            </svg>
            <p className={css.statistic_text}>All Customers</p>
          </div>
          <p className={css.statistics_count}>{statistics.customers}</p>
        </div>
      </div>

      <div className={css.two_table}>
        <div className={css.customer_wrapper}>
          <div className={css.customer_box}>
            <h2 className={css.customer_title}>Recent Customers</h2>
          </div>
          <table className={css.customer_table}>
            <thead>
              <tr>
                <th className={css.table_title}>Name</th>
                <th className={css.table_title}>Email</th>
                <th className={css.table_title}>Spent</th>
                <th className={css.table_title}>Medicine</th>
              </tr>
            </thead>

            <tbody>
              {statistics.recentlyCustomers.slice(0, 5).map((customer) => (
                <tr key={customer._id}>
                  <td className={css.customer_data}>{customer.name}</td>
                  <td className={css.customer_data}>{customer.email}</td>
                  <td className={css.customer_data}>
                    {customer.spent.toLocaleString()}
                  </td>
                  <td className={css.customer_data}>
                    <button className={css.customer_btn} type="button">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={css.income_wrapper}>
          <div className={css.income_box}>
            <h2 className={css.income_title}>Income/Expenses</h2>
          </div>
          <div className={css.income_general}>
            <p className={css.income_table_title}>Today</p>
          </div>
          <table className={css.income_table}>
            <tbody>
              {statistics.incomeExpense.slice(0, 6).map((income) => (
                <tr key={income._id}>
                  <td className={css.income_type_data}>
                    <span className={getTypeClass(income.type)}>
                      {income.type}
                    </span>
                  </td>
                  <td className={css.income_data}>{income.name}</td>
                  <td className={css.income_amount_data}>
                    <span className={getAmountClass(income.type)}>
                      {Number(income.amount).toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
