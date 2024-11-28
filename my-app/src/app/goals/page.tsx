"use client";
import React, { useState } from "react";
import GoalsNavBar from "../components/GoalsNavBar";
import SideBar from "../components/SideBar";
import { GoalsActive } from "../components/GoalsActive";

const GoalsPage = () => {
  const [transactionUpdated, setTransactionUpdated] = useState(false);
  const handleTransactionUpdate = () => {
    setTransactionUpdated(!transactionUpdated);
  };
  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <div className="w-full sm:w-64 h-full bg-gray-100">
        <SideBar />
      </div>
      <div className="flex-1 w-full sm:w-auto">
        <GoalsNavBar onTransactionUpdate={handleTransactionUpdate} />
        <div className="mx-auto max-w-7xl px-4 py-4 sm:py-6">
          <GoalsActive transactionUpdated={transactionUpdated} />
        </div>
      </div>
    </div>
  );
};
export default GoalsPage;