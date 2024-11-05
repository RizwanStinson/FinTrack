import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getTransaction } from "../services/transactionService";
import { format } from "date-fns";

interface DashBoardSummaryProps {
  transactionUpdated: boolean;
}

export function TransactionTable({ transactionUpdated }: DashBoardSummaryProps) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransaction = async () => {
      const serviceResponse = await getTransaction();

      const recentTransactions = serviceResponse.slice(-5).reverse();
      setTransactions(recentTransactions);
    };

    fetchTransaction();
  }, [transactionUpdated]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction: any) => (
              <tr key={transaction.id} className="border-b">
                <td className="px-4 py-2">
                  {format(new Date(transaction.date), "MMM dd")}
                </td>
                <td className="px-4 py-2">{transaction.description}</td>
                <td className="px-4 py-2">{transaction.category}</td>
                <td
                  className={`px-4 py-2 ${
                    transaction.type === "income"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {transaction.type === "expense" ? "-" : "+"}$
                  {transaction.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}
