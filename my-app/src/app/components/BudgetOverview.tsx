// import React, { useEffect, useState } from "react";
// import { ArrowDown } from "lucide-react";
// import { getBudget } from "../services/budgetService";
// import { format } from "date-fns";
// import { IB, ITran } from "../interfaces/interfaces";
// import { useSelector } from "react-redux";
// import { RootState } from "../redux/store";
// import { getExpenseTransaction } from "../services/transactionService";

// export const BudgetOverview = () => {
//     const [totalBudget, setTotalBudget] = useState(0);
//     const [totalSpent, setTotalSpent] = useState(0);
//     const [remaining, setRemaining] = useState(0);
//     const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
//     const [matchingCategories, setMatchingCategories] = useState<string[]>([]);
//     const [expenseTransactions, setExpenseTransactions] = useState<string[]>([]);
//     const [filteredExpenses, setFilteredExpenses] = useState<any[]>([]);

//     const categories = useSelector(
//       (state: RootState) => state.category.categories
//     );

// useEffect(() => {
//   const fetchBudget = async () => {
//     const serviceResponse = await getBudget();
//     const currentDate = new Date();
//     const formattedDate = format(currentDate, "MMMM yyyy");
//     console.log("responses:", serviceResponse);
//     console.log("current:", formattedDate);

//     const matchedBudget = serviceResponse.filter(
//       (item: IB) => item.monthYear === formattedDate
//     );

//     console.log("Matched budget:", matchedBudget);

//     const categoriesSet = new Set(
//       matchedBudget.map((item: IB) => item.category)
//     );
//     const uniqueCategoriesArray = Array.from(categoriesSet) as string[];
//     setUniqueCategories(uniqueCategoriesArray);

//     const amountSum = matchedBudget.reduce(
//       (sum: number, item: IB) => sum + item.amount,
//       0
//     );
//     setTotalBudget(amountSum);

//     const matching = uniqueCategoriesArray.filter((cat) => categories.includes(cat))
//     setMatchingCategories(matching)

//     const expenseTransaction = await getExpenseTransaction()
//     console.log("expense: ", expenseTransaction)
//     setExpenseTransactions(expenseTransaction)

//     const filteredExpenses = expenseTransaction.filter((expense:ITran) =>
//       matching.includes(expense.category)
//     );

//     setFilteredExpenses(filteredExpenses);
//     console.log("Filtered Expenses:", filteredExpenses);

//      const totalSpentAmount = filteredExpenses.reduce(
//        (sum:number, expense:ITran) => sum + expense.amount,
//        0
//      );
//      setTotalSpent(totalSpentAmount);

     
//      setRemaining(amountSum - totalSpentAmount);


//   };
//   fetchBudget();
//   console.log("Categories from Redux store:", categories);
// }, [categories]);

//  console.log("Filtered Expenses Rizwan:", filteredExpenses);

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h3 className="text-sm font-medium text-gray-500">
//           Total Monthly Budget
//         </h3>
//         <p className="text-2xl font-bold text-gray-900">{totalBudget}</p>
//       </div>
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h3 className="text-sm font-medium text-gray-500">Spent This Month</h3>
//         <p className="text-2xl font-bold text-blue-600">{totalSpent}</p>
//       </div>
//       <div className="bg-white p-6 rounded-lg shadow">
//         <h3 className="text-sm font-medium text-gray-500">Remaining Budget</h3>
//         <p className="text-2xl font-bold text-green-600">{remaining}</p>
//         <div className="mt-2 text-sm text-gray-500">
//         </div>
//       </div>
//     </div>
//   );
// };



import React, { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { getBudget } from "../services/budgetService";
import { format } from "date-fns";
import { IB, ITran } from "../interfaces/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getExpenseTransaction } from "../services/transactionService";
import { setFilteredExpenses } from "../redux/slices/expenseSlice";

export const BudgetOverview = () => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [matchingCategories, setMatchingCategories] = useState<string[]>([]);
  const dispatch = useDispatch();

  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  const refresh = useSelector((state: RootState) => state.category.refresh);

  useEffect(() => {
    const fetchBudget = async () => {
      const serviceResponse = await getBudget();
      const currentDate = new Date();
      const formattedDate = format(currentDate, "MMMM yyyy");

      const matchedBudget = serviceResponse.filter(
        (item: IB) => item.monthYear === formattedDate
      );

      const categoriesSet = new Set(
        matchedBudget.map((item: IB) => item.category)
      );
      const uniqueCategoriesArray = Array.from(categoriesSet) as string[];
      setUniqueCategories(uniqueCategoriesArray);

      const amountSum = matchedBudget.reduce(
        (sum: number, item: IB) => sum + item.amount,
        0
      );
      setTotalBudget(amountSum);

      const matching = uniqueCategoriesArray.filter((cat) =>
        categories.includes(cat)
      );
      setMatchingCategories(matching);

      const expenseTransaction = await getExpenseTransaction();
      const filteredExpenses = expenseTransaction.filter((expense: ITran) =>
        matching.includes(expense.category)
      );

      
      dispatch(setFilteredExpenses(filteredExpenses));

      const totalSpentAmount = filteredExpenses.reduce(
        (sum: number, expense: ITran) => sum + expense.amount,
        0
      );
      setTotalSpent(totalSpentAmount);

      setRemaining(amountSum - totalSpentAmount);
    };

    fetchBudget();
  }, [categories, dispatch,refresh]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">
          Total Monthly Budget
        </h3>
        <p className="text-2xl font-bold text-gray-900">{totalBudget}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Spent This Month</h3>
        <p className="text-2xl font-bold text-blue-600">{totalSpent}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-sm font-medium text-gray-500">Remaining Budget</h3>
        <p className="text-2xl font-bold text-green-600">{remaining}</p>
      </div>
    </div>
  );
};
