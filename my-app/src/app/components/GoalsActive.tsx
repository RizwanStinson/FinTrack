import React, { useEffect, useState } from "react";
import { Goals, updateSavings } from "../services/goalService";
import { isBefore, isAfter } from "date-fns";
import { IG } from "../interfaces/interfaces";

interface RefreshProps {
  transactionUpdated: boolean;
}

export const GoalsActive = ({ transactionUpdated }: RefreshProps) => {
  const [ActiveGoalsAll, setActiveGoalsAll] = useState<IG[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [goalToUpdate, setGoalToUpdate] = useState<IG | null>(null);
  const [amountToAdd, setAmountToAdd] = useState<number>(0);

  useEffect(() => {
    const fetchGoals = async () => {
      const allGoals = await Goals();
      const today = new Date();

      const activeGoals = allGoals.filter((goal: IG) => {
        const startDate = goal.startDate ? new Date(goal.startDate) : null;
        const endDate = goal.endDate ? new Date(goal.endDate) : null;

        return (
          startDate &&
          endDate &&
          isAfter(today, startDate) &&
          isBefore(today, endDate)
        );
      });

      setActiveGoalsAll(activeGoals);
    };

    fetchGoals();
  }, [transactionUpdated]);

  const handleAddSavings = (goal: IG) => {
    setGoalToUpdate(goal);
    setShowModal(true);
  };

  const handleSaveSavings = async () => {
    if (goalToUpdate) {
      const updatedGoal = {
        ...goalToUpdate,
        savings: goalToUpdate.savings + amountToAdd,
      };

      await updateSavings(updatedGoal);

      setActiveGoalsAll((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === goalToUpdate.id
            ? { ...goal, savings: goalToUpdate.savings + amountToAdd }
            : goal
        )
      );

      setShowModal(false);
      setAmountToAdd(0);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow w-full">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
          Active Goals
        </h2>
      </div>
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {ActiveGoalsAll.length > 0 ? (
          ActiveGoalsAll.map((goal) => {
            const progress = Math.min(
              (goal.savings / goal.targetAmount) * 100,
              100
            );
            const exceededAmount =
              goal.savings > goal.targetAmount
                ? goal.savings - goal.targetAmount
                : 0;

            return (
              <div
                key={goal.id}
                className="bg-white border rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4 space-y-2 sm:space-y-0">
                  <div className="flex-grow">
                    <h3 className="text-base sm:text-lg font-semibold">
                      {goal.goalName}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Target Date:{" "}
                      {goal.endDate
                        ? new Date(goal.endDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div className="text-blue-500 font-medium text-sm sm:text-base">
                    ${goal.targetAmount.toFixed(2)}
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-xs sm:text-sm text-gray-500">
                      Progress
                    </span>
                    <span className="text-xs sm:text-sm">
                      {progress.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className={`h-2 rounded-full ${
                        progress >= 50 ? "bg-green-500" : "bg-yellow-500"
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="mt-2 text-xs sm:text-sm">
                    Savings: ${goal.savings.toFixed(2)}
                  </div>
                  {exceededAmount > 0 && (
                    <div className="mt-1 text-xs sm:text-sm text-red-500">
                      Exceeded by: ${exceededAmount.toFixed(2)}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleAddSavings(goal)}
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm sm:text-base"
                >
                  Add Savings
                </button>
              </div>
            );
          })
        ) : (
          <p className="text-sm sm:text-base text-center">
            No active goals at the moment.
          </p>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-sm">
            <h3 className="text-base sm:text-lg font-semibold mb-4">
              Add Savings
            </h3>
            <input
              type="number"
              value={amountToAdd}
              onChange={(e) => setAmountToAdd(Number(e.target.value))}
              className="w-full border p-2 rounded mb-4 text-sm sm:text-base"
              placeholder="Enter amount"
            />
            <div className="flex justify-end space-x-2 sm:space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="text-xs sm:text-sm text-gray-600 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSavings}
                className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-600 text-xs sm:text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};