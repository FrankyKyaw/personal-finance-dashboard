"use client";
import React from "react";
import TransactionInput from "@/components/TransactionInput";

import { signIn, useSession } from "next-auth/react";
const categories = [
  { id: "1", name: "Food" },
  { id: "2", name: "Rent" },
  { id: "3", name: "Transportation" },
];

const page: React.FC = () => {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-gray-100">
      {session ? (
        <div className="container mx-auto p-10 bg-white">
          <div className="flex flex-col items-center mb-6 p-6">
            <h1 className="text-3xl font-bold text-gray-700 mb-4">Welcome back, {session.user?.name}</h1>
            <p className="text-gray-600">Manage your transactions below.</p>
          </div>
          <TransactionInput title="Add Transaction" categories={categories} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-4xl font-bold text-gray-700 mb-8">You are not signed in.</h1>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {signIn("google")}}>Sign In</button>
        </div>
      )}
    </main>
  );
};

export default page;
