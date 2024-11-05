import React from "react";
import { Bar } from "react-chartjs-2";

const BudgetMonthlyTrend = () => {
  const monthlyData = [
    { month: "Jul", budget: 3900, actual: 3700 },
    { month: "Aug", budget: 3900, actual: 3800 },
    { month: "Sep", budget: 3900, actual: 3600 },
    { month: "Oct", budget: 3900, actual: 3510 },
    { month: "Nov", budget: 3900, actual: 3510 },
  ];

  const data = {
    labels: monthlyData.map((data) => data.month),
    datasets: [
      {
        label: "Budget",
        data: monthlyData.map((data) => data.budget),
        backgroundColor: "#E5E7EB",
      },
      {
        label: "Actual",
        data: monthlyData.map((data) => data.actual),
        backgroundColor: "#3B82F6",
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Monthly Trend</h2>
      </div>
      <div className="h-64">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default BudgetMonthlyTrend;
