import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import { registerables } from "chart.js";

Chart.register(...registerables);

const BudgetBreakdown = () => {
  const monthlyBudgets = [
    { category: "Housing", spent: 1800, color: "#4F46E5" },
    { category: "Food", spent: 450, color: "#10B981" },
    { category: "Transportation", spent: 380, color: "#F59E0B" },
    { category: "Entertainment", spent: 275, color: "#EC4899" },
    { category: "Shopping", spent: 425, color: "#8B5CF6" },
    { category: "Utilities", spent: 180, color: "#3B82F6" },
  ];

  const data = {
    labels: monthlyBudgets.map((b) => b.category),
    datasets: [
      {
        data: monthlyBudgets.map((b) => b.spent),
        backgroundColor: monthlyBudgets.map((b) => b.color),
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Category Breakdown
        </h2>
      </div>
      <div className="h-64">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default BudgetBreakdown;
