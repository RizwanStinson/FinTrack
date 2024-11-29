import { format } from "date-fns";
import { useEffect, useState } from "react";
import {
  deleteTransaction,
  getTransaction,
  updateTransaction,
} from "../services/transactionService";
import { ITTest } from "../interfaces/interfaces";

interface RefreshProps {
  transactionUpdated: boolean;
}

export function TableAll({ transactionUpdated }: RefreshProps) {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] =
    useState<ITTest | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, [transactionUpdated]);

  const fetchTransactions = async () => {
    const serviceResponse = await getTransaction();
    setTransactions(serviceResponse);
    console.log("Transactions:", transactions)
  };

  const handleEditClick = (transaction: ITTest) => {
    setSelectedTransaction(transaction);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = async (transactionId: string) => {
    await deleteTransaction(transactionId);
    fetchTransactions();
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedTransaction((prev) => {
      if (prev === null) return null;
      return {
        ...prev,
        [name]: name === "amount" ? Number(value) : value,
      };
    });
  };

  const handleEditSave = async () => {
    if (selectedTransaction) {
      const transactionToUpdate = {
        ...selectedTransaction,
        amount: Number(selectedTransaction.amount),
      };
      await updateTransaction(transactionToUpdate);
      setIsEditDialogOpen(false);
      fetchTransactions();
    }
  };

  console.log("T:", transactions);
  return (
    <div className="border border-gray-300 rounded-lg shadow-md w-full overflow-x-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Transactions</h2>
      </div>
      <div className="p-4">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 text-sm bg-gray-100">
              <th className="px-2 sm:px-4 py-2 hidden sm:table-cell">Date</th>
              <th className="px-2 sm:px-4 py-2">Description</th>
              <th className="px-2 sm:px-4 py-2 hidden md:table-cell">
                Category
              </th>
              <th className="px-2 sm:px-4 py-2">Amount</th>
              <th className="px-2 sm:px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction: ITTest) => (
              <tr key={transaction.id} className="border-t">
                <td className="px-2 sm:px-4 py-2 hidden sm:table-cell">
                  {format(new Date(transaction.date), "MMM dd")}
                </td>
                <td className="px-2 sm:px-4 py-2">{transaction.description}</td>
                <td className="px-2 sm:px-4 py-2 hidden md:table-cell">
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
                  {transaction.amount}
                </td>
                <td className="px-2 sm:px-4 py-2 flex space-x-2">
                  <button
                    className="text-blue-500 hover:underline"
                    onClick={() => handleEditClick(transaction)}
                  >
                    ✏️
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDeleteClick(transaction.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-4 sm:p-6 space-y-4">
            <h3 className="text-lg font-semibold">Edit Transaction</h3>
            <input
              name="description"
              value={selectedTransaction?.description || ""}
              onChange={handleEditChange}
              placeholder="Description"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="category"
              value={selectedTransaction?.category || ""}
              onChange={handleEditChange}
              placeholder="Category"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              name="amount"
              type="number"
              value={selectedTransaction?.amount || 0}
              onChange={handleEditChange}
              placeholder="Amount"
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={() => setIsEditDialogOpen(false)}
                className="px-3 sm:px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
