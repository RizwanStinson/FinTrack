'use client'
import React, { useState } from 'react'
import SideBar from '../components/SideBar'
import DashBoardSummary from '../components/DashBoardSummary';
import { TransactionTable } from '../components/TransactionTable';
import NavBar from '../components/NavBar';

type Props = {}

function page({}: Props) {
   const [transactionUpdated, setTransactionUpdated] = useState(false);
    
   const handleTransactionUpdate = () => {
     setTransactionUpdated(!transactionUpdated);
   };

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 p-6">
        <NavBar onTransactionUpdate={handleTransactionUpdate} />
        <DashBoardSummary transactionUpdated={transactionUpdated} />
        <TransactionTable transactionUpdated={transactionUpdated} />
      </div>
    </div>
  );}
export default page