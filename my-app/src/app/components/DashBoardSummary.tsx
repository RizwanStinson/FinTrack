import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useEffect, useState } from 'react'
import { getTransaction } from '../services/transactionService';
import { Itransaction } from '../interfaces/interfaces';
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
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-2xl font-bold ${color}`}>{amount}</p>
      </CardContent>
    </Card>
  );
}


function DashBoardSummary({ transactionUpdated }: DashBoardSummaryProps) {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchTransaction = async () => {
      const serviceResponse = await getTransaction();
      console.log("response: ", serviceResponse);
      const currentDate = new Date();

      const currentMonthTransactions = serviceResponse.filter((item: any) =>
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

  console.log("Type of balance:", typeof balance); 
  console.log("Type of totalIncome:", typeof totalIncome); 
  console.log("Type of totalExpense:", typeof totalExpense); 

  return (
    <div className="flex gap-4 my-4">
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

export default DashBoardSummary