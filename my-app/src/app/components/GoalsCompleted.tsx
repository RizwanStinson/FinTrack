// CompletedGoals.js
import React from "react";
import { Trophy } from "lucide-react";

const GoalsCompleted = () => (
  <div className="mt-6 bg-white rounded-lg shadow">
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900">Completed Goals</h2>
    </div>
    <div className="p-6">
      <div className="text-center py-8">
        <Trophy className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <p className="text-gray-500">
          No completed goals yet. Keep working towards your targets!
        </p>
      </div>
    </div>
  </div>
);

export default GoalsCompleted;
