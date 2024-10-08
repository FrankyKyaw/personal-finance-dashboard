"use client"
import React from "react";
import { useSession, signIn } from "next-auth/react";
import DashboardNavBar from "./DashboardNavBar";
import SideNavBar from "./SideNavBar";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100 w-full">
        <div className="text-2xl font-bold text-gray-700">Loading...</div>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-100 w-full">
        <h1 className="text-4xl font-bold text-gray-700 mb-8">
          You are not signed in.
        </h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          Sign In
        </button>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-100 w-full">
      <DashboardNavBar/>
      <div className="flex flex-1 ">
        <SideNavBar/>
        <div className="flex-1 p-5 bg-gray-50 overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;