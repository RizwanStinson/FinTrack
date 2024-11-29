"use client";
import React, { useState } from "react";
import SideBar from "../components/SideBar";
import DashBoardSummary from "../components/DashBoardSummary";
import { TransactionTable } from "../components/TransactionTable";
import NavBar from "../components/NavBar";

type Props = object;

function Page({}: Props) {
  const [transactionUpdated, setTransactionUpdated] = useState(false);

  const handleTransactionUpdate = () => {
    setTransactionUpdated(!transactionUpdated);
  };

  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      <div className="w-full sm:w-64 h-full bg-gray-100">
        <SideBar />
      </div>
      <div className="flex-1 p-4 sm:p-6 ">
        <NavBar
          onTransactionUpdate={handleTransactionUpdate}
          title="Dashboard"
        />
        <DashBoardSummary transactionUpdated={transactionUpdated} />
        <TransactionTable transactionUpdated={transactionUpdated} />
      </div>
    </div>
  );
}

export default Page;