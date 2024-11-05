import React from "react";
import { AlertCircle, ChevronDown } from "lucide-react";

export const BudgetCategory = () => {
  const monthlyBudgets = [
    { category: "Housing", budget: 2000, spent: 1800, color: "#4F46E5" },
    { category: "Food", budget: 600, spent: 450, color: "#10B981" },
    { category: "Transportation", budget: 400, spent: 380, color: "#F59E0B" },
    { category: "Entertainment", budget: 300, spent: 275, color: "#EC4899" },
    { category: "Shopping", budget: 400, spent: 425, color: "#8B5CF6" },
    { category: "Utilities", budget: 200, spent: 180, color: "#3B82F6" },
  ];

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
                      Over budget by ${category.spent - category.budget}
                    </span>
                  </div>
                )}
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${Math.min(percentage, 100)}%` }}
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
