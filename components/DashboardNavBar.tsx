"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";

const DashboardNavBar = () => {
  return (
    <nav className="w-full bg-gray-50 p-5 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-lg font-bold">
          <Link href="/dashboard">Dashboard</Link>
        </div>
        <div className="flex space-x-6">
          <Link href="/dashboard/transactions" className="text-gray-700 hover:text-blue-500">Transactions</Link>
          <Link href="#" className="text-gray-700 hover:text-blue-500"> Budget</Link>
          <Link href="#" className="text-gray-700 hover:text-blue-500"> Linked Accounts</Link>
          <button
              className="text-gray-700 hover:text-blue-500"
              onClick={() => {
                signOut();
              }}
            >
              Sign Out
            </button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavBar;
