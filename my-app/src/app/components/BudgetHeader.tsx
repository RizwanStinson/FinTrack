import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { getTransaction } from "../services/transactionService";
import { Itransaction } from "../interfaces/interfaces";
import { format } from "date-fns";
import { budgetPost } from "../services/budgetService";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { setCategories, addCategory, toggleRefresh } from "../redux/slices/categorySlice";

export const BudgetHeader = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    handleAddTransaction();
  }, []);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      dispatch(addCategory(newCategory));
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
    await budgetPost(budgetData)
    dispatch(toggleRefresh());
  }

  const handleAddTransaction = async () => {
    const response = await getTransaction();
    const uniqueCategory: string[] = Array.from(
      new Set(
        response.map((transaction: Itransaction) => transaction.category)
      )
    );
    console.log("Unique: ", uniqueCategory);
    dispatch(setCategories(uniqueCategory));
  };

  return (
    <div className="bg-white shadow mb-4">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Budget</h1>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="w-full sm:w-auto">
              <button
                className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => setIsAddingCategory(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Budget
              </button>
            </div>
            {isAddingCategory && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
                <div className="relative w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-lg p-6">
                  <div className="mb-4">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option value="add_new">+ Add Category</option>
                    </select>
                    {category === "add_new" && (
                      <div className="flex flex-col sm:flex-row gap-2 mt-2">
                        <input
                          value={newCategory}
                          onChange={(e) => setNewCategory(e.target.value)}
                          placeholder="Enter new category"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <button
                          onClick={handleAddCategory}
                          className="mt-2 sm:mt-0 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={handleSubmit}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Save Budget
                    </button>
                    <button
                      onClick={() => setIsAddingCategory(false)}
                      className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};