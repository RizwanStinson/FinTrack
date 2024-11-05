import React, { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { getBudget } from "../services/budgetService";
import { format } from "date-fns";
import { IB } from "../interfaces/interfaces";

export const BudgetOverview = () => {
    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0);
    const [remaining, setremaining] = useState(0);

useEffect(() => {
    const fetchBudget = async() => {
        const serviceResponse = await getBudget()
        const currentDate = new Date();
         const formattedDate = format(currentDate, "MMMM yyyy");
        console.log("responses:", serviceResponse)
        console.log("current:", formattedDate)

         const matchedBudget = serviceResponse.filter(
           (item:IB) => item.monthYear === formattedDate
         );

         console.log("Matched budget:", matchedBudget);
    }
 
fetchBudget()

}, [])


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">
          Total Monthly Budget
        </h3>
        <p className="text-2xl font-bold text-gray-900">$3,900.00</p>
        <div className="mt-2 flex items-center text-sm text-green-600">
          <ArrowDown className="w-4 h-4 mr-1" />
          <span>10% under budget</span>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Spent This Month</h3>
        <p className="text-2xl font-bold text-blue-600">$3,510.00</p>
        <div className="mt-2 text-sm text-gray-500">
          <span>Updated 2 hours ago</span>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Remaining Budget</h3>
        <p className="text-2xl font-bold text-green-600">$390.00</p>
        <div className="mt-2 text-sm text-gray-500">
          <span>10 days remaining</span>
        </div>
      </div>
    </div>
  );
};
