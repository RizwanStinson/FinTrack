"use client";
import React, { useState } from "react";
import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { SearchBar } from "../components/Search";
import { TableAll } from "../components/TableAll";

type Props = {};

function page({}: Props) {
     const [transactionUpdated, setTransactionUpdated] = useState(false);

     const handleTransactionUpdate = () => {
       setTransactionUpdated(!transactionUpdated);
     };

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <div className="w-full sm:w-64 h-full bg-gray-100">
        <SideBar />
      </div>
      <div className="flex-1 p-4 sm:p-6 ">
        <NavBar
          onTransactionUpdate={handleTransactionUpdate}
          title="Transactions"
        />{" "}
        <SearchBar />
        <TableAll transactionUpdated={transactionUpdated} />
      </div>
    </div>
  );}

export default page;
