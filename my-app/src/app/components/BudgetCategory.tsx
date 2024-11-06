import React, { useEffect, useState } from "react";
import { AlertCircle, ChevronDown } from "lucide-react";
import { getBudget } from "../services/budgetService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

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
        .sort((a: any, b: any) => b.amount - a.amount)
        .slice(0, 10);
      const formattedBudgets = topBudgets.map((item: any, index: number) => ({
        category: item.category,
        budget: item.amount,
        spent: 0, 
        color: getColorByIndex(index),
      }));

      const updatedBudgets = formattedBudgets.map((budgetCategory:any) => {
        const totalSpentForCategory = filteredExpenses
          .filter((expense) => expense.category === budgetCategory.category)
          .reduce((sum, expense) => sum + expense.amount, 0);

        return { ...budgetCategory, spent: totalSpentForCategory };
      });

      setMonthlyBudgets(updatedBudgets);
    };

    fetchBudget();
  }, [filteredExpenses,refresh]); 


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
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Category Budgets
          </h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">
              This Month
              <ChevronDown className="w-4 h-4 ml-2 inline" />
            </button>
          </div>
        </div>
        <div className="space-y-6">
          {monthlyBudgets.map((category, index) => {
            const percentage = (category.spent / category.budget) * 100;
            const isOverBudget = percentage > 100;

            return (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
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
  );
};
