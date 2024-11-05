import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import axios from "axios";
import debounce from "lodash"; 
import { getTransaction } from "../services/transactionService";
import { startOfWeek, endOfWeek } from "date-fns";


export function SearchBar() {
  const [categories, setCategories] = useState<string[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
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
          new Set(serviceResponse.map((t: any) => t.category))
        ).filter((category): category is string => typeof category === 'string');
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchData();
  }, []);
const handleSearchChange = debounce.debounce(
  (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({ ...prevFilters, search: e.target.value }));
  },
  300
);

const isAnyFilterActive = () => {
  return (
    filters.search !== "" ||
    filters.category !== "all" ||
    filters.dateRange !== "all" ||
    filters.amount !== "none"
  );
};

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
            return (
              transactionDate >= weekStart && transactionDate <= weekEnd
            );
          } else if (filters.dateRange === "this_month") {
            return (
              transactionDate.getMonth() === now.getMonth() &&
              transactionDate.getFullYear() === now.getFullYear()
            );
          } else if (filters.dateRange === "this_year") {
            return transactionDate.getFullYear() === now.getFullYear();
          }
          return false;
        });      }

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
      <div className="flex items-center space-x-4 py-4">
        <Input
          placeholder="Search transactions..."
          className="w-full max-w-xs"
          onChange={handleSearchChange}
        />

        <Select
          value={filters.category}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, category: value }))
          }
        >
          <SelectTrigger className="w-40">
            <span>
              {filters.category === "all" ? "Category" : filters.category}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.dateRange}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, dateRange: value }))
          }
        >
          <SelectTrigger className="w-40">
            <span>
              {filters.dateRange === "all"
                ? "Date Range"
                : filters.dateRange
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="this_week">This Week</SelectItem>
            <SelectItem value="this_month">This Month</SelectItem>
            <SelectItem value="this_year">This Year</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.amount}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, amount: value }))
          }
        >
          <SelectTrigger className="w-40">
            <span>
              {filters.amount === "none"
                ? "Amount"
                : filters.amount.charAt(0).toUpperCase() +
                  filters.amount.slice(1)}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="ascending">Ascending</SelectItem>
            <SelectItem value="descending">Descending</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => setFilteredTransactions(filteredTransactions)}
        >
          Filter
        </Button>
      </div>
      {isAnyFilterActive() && (
        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-500 text-sm">
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="px-4 py-2">
                      {format(new Date(transaction.date), "MMM dd")}
                    </td>
                    <td className="px-4 py-2">{transaction.description}</td>
                    <td className="px-4 py-2">{transaction.category}</td>
                    <td
                      className={`px-4 py-2 ${
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
          </CardContent>
        </Card>
      )}
    </div>
  );
}
