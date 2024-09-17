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

const categories = [
  { id: "1", name: "Food" },
  { id: "2", name: "Rent" },
  { id: "3", name: "Transportation" },
];

const page: React.FC = () => {
  const { data: session, status } = useSession();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [accessTokenLoading, setAccessTokenLoading] = useState<boolean>(true);
  const [needsReauthentication, setNeedsReauthentication] = useState<boolean>(false);

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
  }, [error])
  if (status === "loading" || accessTokenLoading) {
    return (
      <main className="flex h-screen flex-col items-center justify-center p-6 bg-gray-100">
        <div className="text-2xl font-bold text-gray-700">Loading...</div>
      </main>
    );
  }
  return (
      <DashboardLayout>
        <div className="flex flex-col items-center h-screen mb-6 p-8 ml-10 w-full">
          <h1 className="text-3xl font-bold text-gray-700 mb-4 w-full">
            Welcome back, {session?.user?.name}
          </h1>
          {needsReauthentication ? (
          <>
            <p>Your account needs to be re-authenticated.</p>
            <PlaidLinkButton onSuccess={handleSuccess} accessToken={accessToken} />
          </>
        ) : (
          <>
            {!accessToken ? (
              <PlaidLinkButton onSuccess={handleSuccess} />
            ) : (
              <>
                {isLoading && <div>Loading transactions...</div>}
                {transactions && (
                  <TestTransactionList transactions={transactions} />
                )}
              </>
            )}
          </>
        )}
        </div>
      </DashboardLayout>
  );
};

export default page;
