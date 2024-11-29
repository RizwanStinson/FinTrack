import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { debounce } from "lodash";
import { getTransaction } from "../services/transactionService";
import { startOfWeek, endOfWeek } from "date-fns";
import { ITTest } from "../interfaces/interfaces";

export function SearchBar() {
  const [categories, setCategories] = useState<string[]>([]);
  const [transactions, setTransactions] = useState<ITTest[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<ITTest[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    dateRange: "all",
    amount: "none",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceResponse = await getTransaction();
        setTransactions(serviceResponse);

        const uniqueCategories = Array.from(
          new Set(serviceResponse.map((t: ITTest) => t.category))
        ).filter(
          (category): category is string => typeof category === "string"
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters((prevFilters) => ({ ...prevFilters, search: e.target.value }));
    },
    300
  );
  
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...transactions];

      if (filters.search) {
        filtered = filtered.filter((transaction) =>
          transaction.description
            .toLowerCase()
            .includes(filters.search.toLowerCase())
        );
      }

      if (filters.category !== "all") {
        filtered = filtered.filter(
          (transaction) => transaction.category === filters.category
        );
      }

      if (filters.dateRange !== "all") {
        const now = new Date();
        filtered = filtered.filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          if (filters.dateRange === "today") {
            return (
              format(transactionDate, "yyyy-MM-dd") ===
              format(now, "yyyy-MM-dd")
            );
          } else if (filters.dateRange === "this_week") {
            const weekStart = startOfWeek(now);
            const weekEnd = endOfWeek(now);
            return transactionDate >= weekStart && transactionDate <= weekEnd;
          } else if (filters.dateRange === "this_month") {
            return (
              transactionDate.getMonth() === now.getMonth() &&
              transactionDate.getFullYear() === now.getFullYear()
            );
          } else if (filters.dateRange === "this_year") {
            return transactionDate.getFullYear() === now.getFullYear();
          }
          return false;
        });
      }

      if (filters.amount !== "none") {
        filtered.sort((a, b) =>
          filters.amount === "ascending"
            ? a.amount - b.amount
            : b.amount - a.amount
        );
      }

      setFilteredTransactions(filtered);
    };

    applyFilters();
  }, [filters, transactions]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 py-4">
        <input
          placeholder="Search transactions..."
          className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={handleSearchChange}
        />

        <select
          value={filters.category}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, category: e.target.value }))
          }
          className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base appearance-none"
        >
          <option value="all" className="text-sm sm:text-base">
            All Categories
          </option>
          {categories.map((category) => (
            <option
              key={category}
              value={category}
              className="text-sm sm:text-base"
            >
              {category}
            </option>
          ))}
        </select>
        <select
          value={filters.dateRange}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, dateRange: e.target.value }))
          }
          className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none"
        >
          <option value="all" className="text-sm sm:text-base">
            All Dates
          </option>
          <option value="today" className="text-sm sm:text-base">
            Today
          </option>
          <option value="this_week" className="text-sm sm:text-base">
            This Week
          </option>
          <option value="this_month" className="text-sm sm:text-base">
            This Month
          </option>
          <option value="this_year" className="text-sm sm:text-base">
            This Year
          </option>
        </select>
        <select
          value={filters.amount}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, amount: e.target.value }))
          }
          className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none"
        >
          <option className="text-sm sm:text-base" value="none">
            Sort by Amount
          </option>
          <option value="ascending" className="text-sm sm:text-base">
            Ascending
          </option>
          <option value="descending" className="text-sm sm:text-base">
            Descending
          </option>
        </select>
      </div>

      <div>
        {filteredTransactions.length > 0 ? (
          <div className="overflow-x-auto border border-gray-300 rounded-md">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-2 sm:px-4 py-2 hidden sm:table-cell">
                    Date
                  </th>
                  <th className="px-2 sm:px-4 py-2">Description</th>
                  <th className="px-2 sm:px-4 py-2 hidden md:table-cell">
                    Category
                  </th>
                  <th className="px-2 sm:px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-t">
                    <td className="px-2 sm:px-4 py-2 hidden sm:table-cell">
                      {format(new Date(transaction.date), "MMM dd")}
                    </td>
                    <td className="px-2 sm:px-4 py-2">
                      {transaction.description}
                    </td>
                    <td className="px-2 sm:px-4 py-2 hidden md:table-cell">
                      {transaction.category}
                    </td>
                    <td
                      className={`px-2 sm:px-4 py-2 ${
                        transaction.type === "income"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.type === "expense" ? "-" : "+"}$
                      {transaction.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">No transactions found.</p>
        )}
      </div>
    </div>
  );
}