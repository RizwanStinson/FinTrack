import React from 'react'
import { useRouter } from "next/navigation";
import { Target, Home, List, LogOut, PiggyBank } from "lucide-react";
import { Button } from '@/components/ui/button';

type Props = {}

function SideBaritem({
  icon,
  children,
  onClick,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <div
      className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-md cursor-pointer"
      onClick={onClick}
    >
      {icon}
      <span>{children}</span>
    </div>
  );
}

function SideBar({}: Props) {
   const router = useRouter();

   const handleLogout = () => {
     localStorage.removeItem("userId");
     router.push("/login"); 
   };
  return (
    <div className="w-64 bg-gray-100 p-4 flex flex-col justify-between h-min-screen">
      <div>
        <h1 className="text-xl font-bold text-blue-600">Finance Tracker</h1>
        <div className="mt-4 space-y-2">
          <SideBaritem icon={<Home />} onClick={() => router.push("/landing")}>
            Dashboard
          </SideBaritem>
          <SideBaritem
            icon={<List />}
            onClick={() => router.push("/transaction")}
          >
            Transactions
          </SideBaritem>
          <SideBaritem
            icon={<PiggyBank />}
            onClick={() => router.push("/budget")}
          >
            Budget
          </SideBaritem>
          <SideBaritem icon={<Target />} onClick={() => router.push("/goals")}>
            Goals
          </SideBaritem>
        </div>
      </div>
      <Button
        variant="ghost"
        className="flex items-center gap-2 text-gray-500"
        onClick={handleLogout}
      >
        <LogOut />
        Logout
      </Button>
    </div>
  );
}

export default SideBar