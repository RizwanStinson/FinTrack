// ActiveGoals.js
import React from "react";
import { Pencil, Archive, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const GoalsActive = ({ goals }) => (
  <div className="bg-white rounded-lg shadow">
    <div className="p-6 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Active Goals</h2>
        <div className="flex gap-2">
          <Button variant="outline" className="text-sm flex items-center">
            Filter by Status <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" className="text-sm flex items-center">
            Sort by <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
    <div className="p-6 space-y-6">
      {goals.map((goal) => {
        const progress = (goal.current / goal.target) * 100;
        return (
          <div
            key={goal.id}
            className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {goal.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Target Date: {new Date(goal.deadline).toLocaleDateString()}
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" className="p-2">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button variant="ghost" className="p-2">
                  <Archive className="w-4 h-4" />
                </Button>
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
                    goal.status === "on-track"
                      ? "bg-green-500"
                      : "bg-yellow-500"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <Button
              variant="ghost"
              className="w-full mt-4 flex items-center justify-center"
            >
              View Details <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        );
      })}
    </div>
  </div>
);

export default GoalsActive;
