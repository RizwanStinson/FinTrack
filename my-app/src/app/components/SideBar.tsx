"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Target, Home, List, LogOut, PiggyBank, Menu, X } from "lucide-react";

type Props = object;

function SideBarItem({
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
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    router.push("/login");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const renderSidebarContent = () => (
    <>
      <div className="flex justify-between items-center sm:block">
        <h1 className="text-xl font-bold text-blue-600">Finance Tracker</h1>
        <button
          className="sm:hidden text-gray-500 hover:text-gray-700"
          onClick={toggleSidebar}
        >
          <X />
        </button>
      </div>
      <div className="mt-4 space-y-2">
        <SideBarItem icon={<Home />} onClick={() => router.push("/landing")}>
          Dashboard
        </SideBarItem>
        <SideBarItem
          icon={<List />}
          onClick={() => router.push("/transaction")}
        >
          Transactions
        </SideBarItem>
        <SideBarItem
          icon={<PiggyBank />}
          onClick={() => router.push("/budget")}
        >
          Budget
        </SideBarItem>
        <SideBarItem icon={<Target />} onClick={() => router.push("/goals")}>
          Goals
        </SideBarItem>
      </div>
      <button
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 p-2 rounded-md focus:outline-none mt-auto"
        onClick={handleLogout}
      >
        <LogOut />
        Logout
      </button>
    </>
  );

  return (
    <>
      {!isOpen && (
        <button
          className="sm:hidden fixed top-4 left-4 z-50 text-gray-500 hover:text-gray-700"
          onClick={toggleSidebar}
        >
          <Menu />
        </button>
      )}
      <div className="hidden sm:flex sm:w-64 bg-gray-100 p-4 flex-col justify-between min-h-screen fixed left-0 top-0">
        {renderSidebarContent()}
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-40 sm:hidden">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={toggleSidebar}
          ></div>
          <div className="absolute left-0 top-0 w-64 h-full bg-gray-100 p-4 flex flex-col justify-between">
            {renderSidebarContent()}
          </div>
        </div>
      )}
    </>
  );
}

export default SideBar;
