import React, { useEffect, useState } from "react";
import { getBudget } from "../services/budgetService";
import { format } from "date-fns";
import { IB, ITran } from "../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getExpenseTransaction } from "../services/transactionService";
import { setFilteredExpenses } from "../redux/slices/expenseSlice";

export const BudgetOverview = () => {
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [totalSpent, setTotalSpent] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);
  const dispatch = useDispatch();

  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  const refresh = useSelector((state: RootState) => state.category.refresh);

  useEffect(() => {
    const fetchBudget = async () => {
      const serviceResponse = await getBudget();
      const currentDate = new Date();
      const formattedDate = format(currentDate, "MMMM yyyy");

      const matchedBudget = serviceResponse.filter(
        (item: IB) => item.monthYear === formattedDate
      );

      const categoriesSet = new Set(
        matchedBudget.map((item: IB) => item.category)
      );
      const uniqueCategoriesArray: string[] = Array.from(categoriesSet) as string[];

      const amountSum = matchedBudget.reduce(
        (sum: number, item: IB) => sum + item.amount,
        0
      );
      setTotalBudget(amountSum);

      const matching: string[] = uniqueCategoriesArray.filter((cat) =>
        categories.includes(cat)
      );

      const expenseTransaction = await getExpenseTransaction();
      const filteredExpenses = expenseTransaction.filter((expense: ITran) =>
        matching.includes(expense.category)
      );

      dispatch(setFilteredExpenses(filteredExpenses));

      const totalSpentAmount = filteredExpenses.reduce(
        (sum: number, expense: ITran) => sum + expense.amount,
        0
      );
      setTotalSpent(totalSpentAmount);

      setRemaining(amountSum - totalSpentAmount);
    };

    fetchBudget();
  }, [categories, dispatch, refresh]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Total Monthly Budget
          </h3>
          <p className="text-xl font-bold text-blue-600">${totalBudget}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Spent This Month
          </h3>
          <p className="text-xl font-bold text-red-600">${totalSpent}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Remaining Budget
          </h3>
          <p className="text-xl font-bold text-green-600">${remaining}</p>
        </div>
      </div>
    </div>
  );
};