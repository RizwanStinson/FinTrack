'use client'
import React from "react";
import GoalsNavBar from "../components/GoalsNavBar";
import SideBar from "../components/SideBar";
import { GoalsActive } from "../components/GoalsActive";
import GoalsCompleted from "../components/GoalsCompleted";

const GoalsPage = () => (
  <div className="flex">
    <SideBar />
    <div className="flex-1">
      <GoalsNavBar />
      <div className="mx-auto max-w-7xl px-4 py-6">
        <GoalsActive />
        {/* <GoalsCompleted /> */}
      </div>
    </div>
  </div>
);

export default GoalsPage;
