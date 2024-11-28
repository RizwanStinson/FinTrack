import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);
import { registerables } from "chart.js";

Chart.register(...registerables);

interface BudgetBreakdownProps {
  monthlyBudgets: {
    category: string;
    spent: number;
    color: string;
  }[];
}

const BudgetBreakdown: React.FC<BudgetBreakdownProps> = ({
  monthlyBudgets,
}) => {
  if (monthlyBudgets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Category Breakdown
        </h2>
        <p className="text-gray-500">No budget data available</p>
      </div>
    );
  }

  const data = {
    labels: monthlyBudgets.map((b) => b.category),
    datasets: [
      {
        data: monthlyBudgets.map((b) => b.spent),
        backgroundColor: monthlyBudgets.map((b) => b.color),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 20,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Category Breakdown
      </h2>
      <div className="w-full h-64 sm:h-80">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default BudgetBreakdown;