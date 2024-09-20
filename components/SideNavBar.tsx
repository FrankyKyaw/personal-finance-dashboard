import React from "react";
import Link from "next/link";

const SideNavBar: React.FC = () => {
  return (
    <nav className="h-2/3 bg-white w-64 p-5 border-r shadow-lg">
      <div className="flex flex-col pt-10 space-y-6">
        <Link href="/dashboard" className="text-gray-700 hover:text-blue-500">
          Dashboard
        </Link>
        <Link
          href="/dashboard/transactions"
          className="text-gray-700 hover:text-blue-500"
        >
          Transactions
        </Link>
        <Link
          href="/dashboard/budget"
          className="text-gray-700 hover:text-blue-500"
        >
          Budget
        </Link>
        <Link
          href="/dashboard/linked-accounts"
          className="text-gray-700 hover:text-blue-500"
        >
          Linked Accounts
        </Link>
      </div>
    </nav>
  );
};

export default SideNavBar;
