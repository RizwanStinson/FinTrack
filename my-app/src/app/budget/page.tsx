'use client'
import React from "react";
import { BudgetHeader } from "../components/BudgetHeader";
import { BudgetOverview } from "../components/BudgetOverview";
import { BudgetCategory } from "../components/BudgetCategory";
import BudgetMonthlyTrend from "../components/BudgetMonthlyTrend";
import BudgetBreakdown from "../components/BudgetBreakdown";

const BudgetPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <BudgetHeader />
      <div className="mx-auto max-w-7xl px-4 py-6">
        <BudgetOverview />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <BudgetBreakdown />
          <BudgetMonthlyTrend />
        </div>
        <BudgetCategory />
      </div>
    </div>
  );
};

export default BudgetPage;
