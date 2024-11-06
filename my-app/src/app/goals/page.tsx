'use client'
import React, { useState } from "react";
import GoalsNavBar from "../components/GoalsNavBar";
import SideBar from "../components/SideBar";
import { GoalsActive } from "../components/GoalsActive";
import GoalsCompleted from "../components/GoalsCompleted";

const GoalsPage = () =>{
     const [transactionUpdated, setTransactionUpdated] = useState(false);

     const handleTransactionUpdate = () => {
       setTransactionUpdated(!transactionUpdated);
     };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <GoalsNavBar onTransactionUpdate={handleTransactionUpdate} />
        <div className="mx-auto max-w-7xl px-4 py-6">
          <GoalsActive transactionUpdated={transactionUpdated} />
          {/* <GoalsCompleted /> */}
        </div>
      </div>
    </div>
  );
} 

export default GoalsPage;
