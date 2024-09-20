"use client";
import React, { useEffect, useState } from "react";
import TransactionInput from "@/components/TransactionInput";

import { signIn, signOut, useSession } from "next-auth/react";
import TransactionList from "@/components/TransactionList";
import DashboardNavBar from "@/components/DashboardNavBar";
import DashboardLayout from "@/components/DashboardLayout";
import PlaidLinkButton from "@/components/PlaidLinkButton";
import TestTransactionList from "@/components/TestTransactionList";
import { useTransactions } from "@/hooks/useTransactions";
import MonthlyChart from "@/components/Dashboard/MonthlyChart";
import SideNavBar from "@/components/SideNavBar";

const categories = [
  { id: "1", name: "Food" },
  { id: "2", name: "Rent" },
  { id: "3", name: "Transportation" },
];

const page: React.FC = () => {
  const { data: session, status } = useSession();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [accessTokenLoading, setAccessTokenLoading] = useState<boolean>(true);
  const [needsReauthentication, setNeedsReauthentication] =
    useState<boolean>(false);

  const {
    data: transactions,
    isLoading,
    error,
  } = useTransactions(accessToken || "");

  const handleSuccess = (accessToken: string) => {
    setAccessToken(accessToken);
    setNeedsReauthentication(false);
  };

  useEffect(() => {
    const getAccessToken = async () => {
      setAccessTokenLoading(true);
      try {
        const response = await fetch("/api/plaid/fetchAccessToken", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: session?.user?.id }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.accessToken) {
          setAccessToken(data.accessToken);
        }
      } catch (error) {
        console.error("Failed to fetch access token", error);
      } finally {
        setAccessTokenLoading(false);
      }
    };
    getAccessToken();
  }, [status, session?.user?.id, accessToken]);

  useEffect(() => {
    if (error) {
      try {
        const errorData = JSON.parse(error.message);
        if (errorData.error === "ITEM_LOGIN_REQUIRED") {
          setNeedsReauthentication(true);
        }
      } catch (parseError) {
        console.error("Error parsing error message", parseError);
      }
    }
  }, [error]);
  if (status === "loading" || accessTokenLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <DashboardLayout>
      <div className="flex h-screen bg-gray-50">
        <SideNavBar/>
        <div className="flex-1 overflow-hidden">
          <div className="px-4 h-full overflow-y-auto">
            <div className="ml-4 mb-4">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                Welcome back, {session?.user?.name}
              </h1>
              <p className="text-lg text-gray-600">
                Here's a quick overview of your financial activity.
              </p>
            </div>
            
            {needsReauthentication ? (
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
                <p className="text-red-500 text-center font-semibold mb-4">
                  Your account needs to be re-authenticated.
                </p>
                <PlaidLinkButton
                  onSuccess={handleSuccess}
                  accessToken={accessToken}
                />
              </div>
            ) : !accessToken ? (
              <div className="flex justify-center">
                <PlaidLinkButton onSuccess={handleSuccess} />
              </div>
            ) : (
              <>
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : transactions ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Monthly Finance Overview
                      </h2>
                      <div className="h-80 items-center justify-center">
                        <MonthlyChart transactions={transactions} />
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <h2 className="text-2xl font-bold text-gray-800 ">
                        Recent Transactions
                      </h2>
                      <div className="h-80 overflow-y-auto pr-2">
                        <TestTransactionList transactions={transactions} />
                      </div>
                    </div>
                  </div>
                ) : null}
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default page;
