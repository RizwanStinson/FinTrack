import React from 'react'
import { Target, Home, List, LogOut, PiggyBank } from "lucide-react";
import { Button } from '@/components/ui/button';

type Props = {}

function SideBaritem({icon, children}: {icon: React.ReactNode; children: React.ReactNode}){
    return (
      <div className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-md cursor-pointer">
        {icon}
        <span>{children}</span>
      </div>
    );
}

function SideBar({}: Props) {
  return (
    <div className="w-64 bg-gray-100 p-4 flex flex-col justify-between h-screen">
      <div>
        <h1 className="text-xl font-bold text-blue-600">Finance Tracker</h1>
        <div className="mt-4 space-y-2">
          <SideBaritem icon={<Home />}>Dashboard</SideBaritem>
          <SideBaritem icon={<List />}>Transactions</SideBaritem>
          <SideBaritem icon={<PiggyBank />}>Budget</SideBaritem>
          <SideBaritem icon={<Target />}>Goals</SideBaritem>
        </div>
      </div>
      <Button
        variant="ghost"
        className="flex items-center gap-2 text-gray-500"
      >
        <LogOut />
        Logout
      </Button>
    </div>
  );
}

export default SideBar