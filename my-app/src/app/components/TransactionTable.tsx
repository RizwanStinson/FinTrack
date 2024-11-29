import { useEffect, useState } from "react";
import { getTransaction } from "../services/transactionService";
import { format } from "date-fns";
import { ITTest } from "../interfaces/interfaces";

interface DashBoardSummaryProps {
  transactionUpdated: boolean;
}

export function TransactionTable({
  transactionUpdated,
}: DashBoardSummaryProps) {
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
    <div className="border rounded-lg shadow-md p-4 bg-white overflow-x-auto">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
      </div>
      <table className="w-full text-left min-w-[600px]">
        <thead>
          <tr className="text-gray-500 text-sm">
            <th className="px-2 sm:px-4 py-2 hidden sm:table-cell">Date</th>
            <th className="px-2 sm:px-4 py-2">Description</th>
            <th className="px-2 sm:px-4 py-2 hidden sm:table-cell">Category</th>
            <th className="px-2 sm:px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction: ITTest) => (
            <tr key={transaction.id} className="border-b">
              <td className="px-2 sm:px-4 py-2 hidden sm:table-cell">
                {format(new Date(transaction.date), "MMM dd")}
              </td>
              <td className="px-2 sm:px-4 py-2">
                <div className="flex flex-col">
                  <span className="sm:hidden text-xs text-gray-500">
                    {format(new Date(transaction.date), "MMM dd")}
                  </span>
                  <span>{transaction.description}</span>
                  <span className="sm:hidden text-xs text-gray-500">
                    {transaction.category}
                  </span>
                </div>
              </td>
              <td className="px-2 sm:px-4 py-2 hidden sm:table-cell">
                {transaction.category}
              </td>
              <td
                className={`px-2 sm:px-4 py-2 ${
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
    </div>
  );
}