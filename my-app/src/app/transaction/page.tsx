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
   <div className="flex">
     <SideBar />
     <div className="flex-1 p-6">
       <NavBar onTransactionUpdate={handleTransactionUpdate} />
       <SearchBar />
       <TableAll />
     </div>
   </div>
)}

export default page;
