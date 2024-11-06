'use client'
import React from "react";
import GoalsNavBar from "../components/GoalsNavBar";
import SideBar from "../components/SideBar";
import GoalsActive from "../components/GoalsActive";
import GoalsCompleted from "../components/GoalsCompleted";

const goals = [
  {
    id: 1,
    name: "Emergency Fund",
    target: 10000,
    current: 7500,
    deadline: "2024-12-31",
    category: "Savings",
    priority: "High",
    monthlyContribution: 500,
    status: "on-track",
  },
  // ... other goals
];

const GoalsPage = () => (
  <div className="flex">
    <SideBar />
    <div className="flex-1">
      <GoalsNavBar />
      <div className="mx-auto max-w-7xl px-4 py-6">
        <GoalsActive goals={goals} />
        <GoalsCompleted />
      </div>
    </div>
  </div>
);

export default GoalsPage;
