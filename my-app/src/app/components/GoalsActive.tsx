import React, { useEffect, useState } from "react";
import { Pencil, Archive, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Goals, updateSavings } from "../services/goalService";
import { isBefore, isAfter } from "date-fns";
import { IG } from "../interfaces/interfaces";

export const GoalsActive = () => {
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

        
        return startDate && endDate && isAfter(today, startDate) && isBefore(today, endDate);
      });

      setActiveGoalsAll(activeGoals); 
    };

    fetchGoals();
  }, []);

  console.log("Active Goals: ", ActiveGoalsAll);

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
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Active Goals</h2>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {ActiveGoalsAll.length > 0 ? (
          ActiveGoalsAll.map((goal) => {
            const progress = (goal.savings / goal.targetAmount) * 100;

            return (
              <div
                key={goal.id}
                className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {goal.goalName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Target Date:{" "}
                      {goal.endDate
                        ? new Date(goal.endDate).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div className="text-blue-500 text-sm font-medium">
                    ${goal.targetAmount.toFixed(2)}
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Progress
                    </span>
                    <span className="text-sm font-medium text-gray-900">
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
                  <div className="mt-2 text-sm font-medium text-gray-500">
                    Savings: ${goal.savings.toFixed(2)}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full mt-4 flex items-center justify-center"
                  onClick={() => handleAddSavings(goal)}
                >
                  Add Savings
                </Button>
              </div>
            );
          })
        ) : (
          <p>No active goals at the moment.</p>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add Savings
            </h3>
            <input
              type="number"
              value={amountToAdd}
              onChange={(e) => setAmountToAdd(Number(e.target.value))}
              className="border p-2 rounded w-full mb-4"
              placeholder="Enter amount"
            />
            <div className="flex justify-between">
              <Button
                variant="outline"
                className="w-1/2"
                onClick={() => setShowModal(false)} 
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                className="w-1/2"
                onClick={handleSaveSavings}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};