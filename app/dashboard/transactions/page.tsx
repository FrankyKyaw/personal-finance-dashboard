"use client";
import DashboardLayout from "@/components/DashboardLayout";
import DashboardNavBar from "@/components/DashboardNavBar";
import TransactionList from "@/components/TransactionList";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col h-screen mb-6 items-center p-8 ml-10 w-full">
      <h1 className="text-2xl font-bold mb-8">Transaction List</h1>
      <TransactionList />
    </div>
  );
};

export default page;
