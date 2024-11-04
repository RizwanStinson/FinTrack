import React from "react";
import {
  LayoutDashboard,
  PiggyBank,
  LineChart,
  Calendar,
  Settings,
  LogOut,
  Plus,
  Filter,
  Download,
} from "lucide-react";

const FinanceTrackerLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-xl font-bold text-blue-600">FinanceTracker</h1>
          <div className="mt-4">
            <div className="flex items-center p-2 text-gray-700 rounded hover:bg-blue-50 cursor-pointer">
              <LayoutDashboard className="w-5 h-5 mr-2" />
              <span>Dashboard</span>
            </div>
            <div className="flex items-center p-2 text-gray-700 rounded hover:bg-blue-50 cursor-pointer">
              <PiggyBank className="w-5 h-5 mr-2" />
              <span>Transactions</span>
            </div>
            <div className="flex items-center p-2 text-gray-700 rounded hover:bg-blue-50 cursor-pointer">
              <LineChart className="w-5 h-5 mr-2" />
              <span>Budget</span>
            </div>
            <div className="flex items-center p-2 text-gray-700 rounded hover:bg-blue-50 cursor-pointer">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Goals</span>
            </div>
            <div className="flex items-center p-2 text-gray-700 rounded hover:bg-blue-50 cursor-pointer">
              <Settings className="w-5 h-5 mr-2" />
              <span>Settings</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <div className="flex items-center text-gray-700 cursor-pointer">
            <LogOut className="w-5 h-5 mr-2" />
            <span>Logout</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Dashboard</h2>
            <div className="flex space-x-2">
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Transaction
              </button>
              <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
              <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">
                Total Balance
              </h3>
              <p className="text-2xl font-bold text-gray-900">$12,750.85</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">
                Monthly Income
              </h3>
              <p className="text-2xl font-bold text-green-600">+$4,250.00</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">
                Monthly Expenses
              </h3>
              <p className="text-2xl font-bold text-red-600">-$2,150.45</p>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
            </div>
            <div className="p-4">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="pb-4">Date</th>
                    <th className="pb-4">Description</th>
                    <th className="pb-4">Category</th>
                    <th className="pb-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="py-4">Oct 15</td>
                    <td>Grocery Shopping</td>
                    <td>Food</td>
                    <td className="text-right text-red-600">-$85.45</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-4">Oct 14</td>
                    <td>Salary Deposit</td>
                    <td>Income</td>
                    <td className="text-right text-green-600">+$3,500.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceTrackerLayout;
