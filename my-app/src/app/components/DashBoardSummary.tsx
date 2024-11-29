import React, { useEffect, useState } from "react";
import { getTransaction } from "../services/transactionService";
import { Itransaction, ITTest } from "../interfaces/interfaces";
import { isSameMonth, parseISO } from "date-fns";

interface SummaryCardProps {
  title: string;
  amount: string;
  color: string;
}

interface DashBoardSummaryProps {
  transactionUpdated: boolean;
}

export function SummaryCard({ title, amount, color }: SummaryCardProps) {
  return (
    <div className="flex-1 border rounded-lg shadow-md p-4 bg-white min-w-[150px]">
      <div className="mb-2">
        <h2 className="text-sm sm:text-base font-semibold truncate">{title}</h2>
      </div>
      <div>
        <p className={`text-lg sm:text-2xl font-bold ${color} truncate`}>
          {amount}
        </p>
      </div>
    </div>
  );
}

function DashBoardSummary({ transactionUpdated }: DashBoardSummaryProps) {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchTransaction = async () => {
      const serviceResponse = await getTransaction();
      console.log("ServiceResponse: ", serviceResponse)
      const currentDate = new Date();

      const currentMonthTransactions = serviceResponse.filter((item: ITTest) =>
        isSameMonth(parseISO(item.date), currentDate)
      );

      const incomeTransactions = currentMonthTransactions.filter(
        (item: Itransaction) => item.type === "income"
      );
      const expenseTransactions = currentMonthTransactions.filter(
        (item: Itransaction) => item.type === "expense"
      );

      const incomeTotal = incomeTransactions.reduce(
        (sum: number, item: Itransaction) => sum + item.amount,
        0
      );
      const incomeTotalNumber = Number(incomeTotal);
      const expenseTotal = expenseTransactions.reduce(
        (sum: number, item: Itransaction) => sum + item.amount,
        0
      );
      const calculatedBalance = incomeTotal - expenseTotal;

      setTotalIncome(incomeTotalNumber);
      setTotalExpense(expenseTotal);
      setBalance(calculatedBalance);
    };

    fetchTransaction();
  }, [transactionUpdated]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
      <SummaryCard
        title="Total Balance"
        amount={`$${balance.toFixed(2)}`}
        color="text-black"
      />
      <SummaryCard
        title="Monthly Income"
        amount={`+$${totalIncome.toFixed(2)}`}
        color="text-green-500"
      />
      <SummaryCard
        title="Monthly Expenses"
        amount={`-$${totalExpense.toFixed(2)}`}
        color="text-red-500"
      />
    </div>
  );
}

export default DashBoardSummary;