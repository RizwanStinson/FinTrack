'use client'
import React from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import { BudgetHeader } from "../components/BudgetHeader";
import { BudgetOverview } from "../components/BudgetOverview";
import { BudgetCategory } from "../components/BudgetCategory";
import BudgetMonthlyTrend from "../components/BudgetMonthlyTrend";
import BudgetBreakdown from "../components/BudgetBreakdown";
import SideBar from "../components/SideBar";

const BudgetPage = () => {
  return (
    // <Provider store={store}>
    //   <div className="flex min-h-screen bg-gray-50">
    //     <SideBar />
    //     <div className="min-h-screen bg-gray-50">
    //       <BudgetHeader />
    //       <div className="mx-auto max-w-7xl px-4 py-6">
    //         <BudgetOverview />
    //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
    //           <BudgetBreakdown />
    //           <BudgetMonthlyTrend />
    //         </div>
    //         <BudgetCategory />
    //       </div>
    //     </div>
    //   </div>
    // </Provider>
    <Provider store={store}>
      <div className="flex min-h-screen bg-gray-50">
        <SideBar />
        <div className="flex-1 p-6 mb-8">
          <BudgetHeader />
          <div className="mx-auto max-w-7xl">
            <BudgetOverview />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* <BudgetBreakdown />
              <BudgetMonthlyTrend /> */}
            </div>
            <BudgetCategory />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default BudgetPage;
