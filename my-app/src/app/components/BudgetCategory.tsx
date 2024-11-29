import React, { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { getBudget } from "../services/budgetService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import BudgetBreakdown from "./BudgetBreakdown";
import { IB } from "../interfaces/interfaces";

interface BudgetCategoryProps {
  category: string;
  budget: number;
  spent: number;
  color: string;
}

export const BudgetCategory: React.FC = () => {
  const [monthlyBudgets, setMonthlyBudgets] = useState<BudgetCategoryProps[]>(
    []
  );
  const filteredExpenses = useSelector(
    (state: RootState) => state.expense.filteredExpenses
  );
  const refresh = useSelector((state: RootState) => state.category.refresh);

  useEffect(() => {
    const fetchBudget = async () => {
      const allBudget = await getBudget();

      const topBudgets = allBudget
        .sort((a: IB, b: IB) => b.amount - a.amount)
        .slice(0, 10);

      const formattedBudgets = topBudgets.map((item: IB, index: number) => ({
        category: item.category,
        budget: item.amount,
        spent: 0,
        color: getColorByIndex(index),
      }));

      const updatedBudgets = formattedBudgets.map((budgetCategory: IB) => {
        const totalSpentForCategory = filteredExpenses
          .filter((expense: { category: string }) => expense.category === budgetCategory.category)          .reduce((sum, expense) => sum + expense.amount, 0);

        return { ...budgetCategory, spent: totalSpentForCategory };
      });

      setMonthlyBudgets(updatedBudgets);
    };

    fetchBudget();
  }, [filteredExpenses, refresh]);

  const getColorByIndex = (index: number) => {
    const colors = [
      "#4F46E5",
      "#10B981",
      "#F59E0B",
      "#EC4899",
      "#8B5CF6",
      "#3B82F6",
      "#EF4444",
      "#14B8A6",
      "#DB2777",
      "#D97706",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-6">
      <div className="w-full overflow-x-auto">
        <BudgetBreakdown monthlyBudgets={monthlyBudgets} />
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Category Budgets
            </h2>
          </div>
          <div className="space-y-4 sm:space-y-6">
            {monthlyBudgets.map((category, index) => {
              const percentage = (category.spent / category.budget) * 100;
              const isOverBudget = percentage > 100;

              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {category.category}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-500">
                      ${category.spent} / ${category.budget}
                    </span>
                  </div>
                  {isOverBudget && (
                    <div className="flex items-center text-sm text-red-600">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      <span>
                        Over budget by $
                        {Math.abs(category.spent - category.budget)}
                      </span>
                    </div>
                  )}
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(percentage, 100)}%`,
                        backgroundColor: category.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};