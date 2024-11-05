import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { deleteTransaction, getTransaction, updateTransaction } from "../services/transactionService";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Itransaction } from "../interfaces/interfaces";


export function TableAll() {
    const [transactions, setTransactions] = useState([]);
     const [selectedTransaction, setSelectedTransaction] = useState<Itransaction | null>(null);
     const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

      useEffect(() => {
        fetchTransactions();
      }, []);

      const fetchTransactions = async () => {
        const serviceResponse = await getTransaction();
        setTransactions(serviceResponse);
      };

      const handleEditClick = (transaction:Itransaction) => {
        setSelectedTransaction(transaction);
        setIsEditDialogOpen(true);
      };

      const handleDeleteClick = async (transactionId:string) => {
        await deleteTransaction(transactionId);
        fetchTransactions(); // Refresh the list after deletion
      };

      const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSelectedTransaction((prev) => {
          if (prev === null) return null;
          return {
            ...prev,
            [name]: value,
          };
        });
      };

      const handleEditSave = async () => {
        if (selectedTransaction) {
          await updateTransaction(selectedTransaction);
          setIsEditDialogOpen(false);
          fetchTransactions(); // Refresh the list after updating
        }
      };      

// useEffect(() => {
//   const fetchTransaction = async () => {
//     const serviceResponse = await getTransaction();
//     setTransactions(serviceResponse);
//     console.log("T:", transactions)
//   };

//   fetchTransaction();
// }, []);

console.log("T:", transactions);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Actions</th>
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
                  {transaction.amount}
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <Button
                    variant="ghost"
                    onClick={() => handleEditClick(transaction)}
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="ghost"
                    className="text-red-500"
                    onClick={() => handleDeleteClick(transaction.id)}
                  >
                    🗑️
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              name="description"
              value={selectedTransaction?.description || ""}
              onChange={handleEditChange}
              placeholder="Description"
            />
            <Input
              name="category"
              value={selectedTransaction?.category || ""}
              onChange={handleEditChange}
              placeholder="Category"
            />
            <Input
              name="amount"
              type="number"
              value={selectedTransaction?.amount || ""}
              onChange={handleEditChange}
              placeholder="Amount"
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditSave}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
