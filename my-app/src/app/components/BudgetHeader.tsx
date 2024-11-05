import React, { useEffect, useState } from "react";
import { Plus, Settings } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getTransaction } from "../services/transactionService";
import { Itransaction } from "../interfaces/interfaces";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { budgetPost } from "../services/budgetService";

export const BudgetHeader = () => {
    const [categories, setCategories] = useState(["Salary"]);
     const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
     const [isAddingCategory, setIsAddingCategory] = useState(false);
const [newCategory, setNewCategory] = useState("");

     useEffect(() => {
       handleAddTransaction();
     }, []);

     const handleAddCategory = () => {
       if (newCategory.trim()) {
         addCategory(newCategory);
         setCategory(newCategory);
         setNewCategory("");
         setIsAddingCategory(false);
       }
     };

     const handleSubmit = async () => {
        const budgetData = {
          category,
          amount: parseFloat(amount),
          monthYear: format(new Date(), "MMMM yyyy"),
        };
        const response = await budgetPost(budgetData)
     }

       const addCategory = (newCategory: string | null) => {
         if (newCategory && !categories.includes(newCategory)) {
           setCategories([...categories, newCategory]);
         }
       };

     const handleAddTransaction = async () => {
       const response = await getTransaction();
       const uniqueCategory: string[] = Array.from(
         new Set(
           response.map((transaction: Itransaction) => transaction.category)
         )
       );
       console.log("Unique: ", uniqueCategory);
       setCategories(uniqueCategory);
     };

  return (
    <div className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Budget</h1>
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Budget
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Budget</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Select
                    value={category}
                    onValueChange={(value) => {
                      if (value === "add_new") {
                        setIsAddingCategory(true);
                      } else {
                        setCategory(value);
                      }
                    }}
                  >
                    <SelectTrigger className="w-full">
                      {category || "Select Category"}
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                      <SelectItem value="add_new">+ Add Category</SelectItem>
                    </SelectContent>
                  </Select>
                  {isAddingCategory && (
                    <div className="flex gap-2">
                      <Input
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Enter new category"
                      />
                      <Button onClick={handleAddCategory}>Add</Button>
                    </div>
                  )}
                </div>
                <Input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <DialogClose asChild>
                  <Button onClick={handleSubmit} className="w-full">
                    Save Budget
                  </Button>
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};
