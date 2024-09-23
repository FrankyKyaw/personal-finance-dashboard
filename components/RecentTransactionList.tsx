// components/RecentTransactionList.tsx

import React from "react";
import { Transaction } from "@/types/transaction";
import { isWithinInterval, subDays, parseISO } from "date-fns";

const RecentTransactionList: React.FC<{ transactions: Transaction[] }> = ({
  transactions,
}) => {

    const recentTransactions = transactions.filter((transaction) =>
    isWithinInterval(parseISO(transaction.date), {
      start: subDays(new Date(), 1),
      end: new Date(),
    })
  );

  return (
    <div className="w-full max-w-4xl px-6 py-4 bg-white mb-10 flex flex-col">
      <div className="flex-grow rounded-lg border shadow-sm px-6 py-4 overflow-auto">
        <table className="min-w-full divide-y">
          <thead>
            <tr>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Merchant
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {recentTransactions.map((transaction) => (
              <tr key={transaction.transaction_id}>
                <td className="text-sm p-3 whitespace-nowrap">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="text-sm p-3 whitespace-nowrap">
                  {transaction.merchant_name || transaction.name}
                </td>
                <td className="text-sm p-3 whitespace-nowrap">
                  <span
                    className={`font-semibold ${
                      transaction.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {recentTransactions.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No recent transactions.
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentTransactionList;
