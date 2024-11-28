import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postGoal } from "../services/goalService";

type NavBarProps = {
  onTransactionUpdate: () => void;
};

const GoalsNavBar = ({ onTransactionUpdate }: NavBarProps) => {
  const [goalName, setGoalName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [savings, setSavings] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = async () => {
    const goalData = {
      goalName,
      targetAmount: parseFloat(targetAmount),
      startDate,
      endDate,
      savings: parseFloat(savings),
    };
    const response = await postGoal(goalData);
    if (response) {
      setGoalName("");
      setTargetAmount("");
      setStartDate(null);
      setEndDate(null);
      setSavings("");
      setIsDialogOpen(false);
      onTransactionUpdate();
    }
  };

  return (
    <div className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 w-full sm:w-auto text-center sm:text-left">
            Financial Goals
          </h1>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 text-sm sm:text-base"
          >
            + Add Goal
          </button>
        </div>
      </div>
      {isDialogOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4">Add New Goal</h2>
            <div className="space-y-3 sm:space-y-4">
              <input
                type="text"
                placeholder="Goal Name"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                className="border rounded p-2 w-full text-sm sm:text-base"
              />
              <input
                type="number"
                placeholder="Amount"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                className="border rounded p-2 w-full text-sm sm:text-base"
              />
              <div>
                <label className="block text-gray-700 text-xs sm:text-sm mb-1">
                  Start Date
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="border rounded p-2 w-full text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-xs sm:text-sm mb-1">
                  End Date
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="border rounded p-2 w-full text-sm sm:text-base"
                />
              </div>
              <input
                type="number"
                placeholder="Saved Till Now"
                value={savings}
                onChange={(e) => setSavings(e.target.value)}
                className="border rounded p-2 w-full text-sm sm:text-base"
              />
              <div className="flex justify-end space-x-2 sm:space-x-4">
                <button
                  onClick={() => setIsDialogOpen(false)}
                  className="text-xs sm:text-sm text-gray-600 hover:underline"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded shadow hover:bg-blue-600 text-xs sm:text-base"
                >
                  Save Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsNavBar;