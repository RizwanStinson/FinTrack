"use client";
import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BudgetHeader } from "../components/BudgetHeader";
import { BudgetOverview } from "../components/BudgetOverview";
import { BudgetCategory } from "../components/BudgetCategory";
import SideBar from "../components/SideBar";

const BudgetPage = () => {
  const defaultMonthlyBudgets = [{ category: "", spent: 0, color: "#000000" }];

  return (
    <Provider store={store}>
      <div className="flex flex-col sm:flex-row min-h-screen bg-gray-50">
        <div className="w-full sm:w-64 h-full bg-gray-100">
          <SideBar />
        </div>
        <div className="flex-1 w-full sm:w-auto">
          <BudgetHeader />
          <BudgetOverview />
          <BudgetCategory />
        </div>
      </div>
    </Provider>
  );
};

export default BudgetPage;