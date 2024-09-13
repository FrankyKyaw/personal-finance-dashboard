"use client";
import React from "react";

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  category: string;
}

const sampleTransactions: Transaction[] = [
  {
    id: 1,
    date: "2023-07-01",
    description: "Groceries",
    amount: -50.75,
    category: "Food",
  },
  {
    id: 2,
    date: "2023-07-02",
    description: "Salary",
    amount: 1500.0,
    category: "Income",
  },
  {
    id: 3,
    date: "2023-07-03",
    description: "Rent",
    amount: -800.0,
    category: "Rent",
  },
  {
    id: 4,
    date: "2023-07-04",
    description: "Public Transport",
    amount: -20.0,
    category: "Transportation",
  },
];

const TransactionList: React.FC = () => {
  return (
    <div className="w-full max-w-4xl bg-white shadow-sm overflow-hidden rounded-lg border mb-10">
      <div className="px-6 py-4">
        <table className="min-w-full divide-y">
          <thead className="">
            <tr>
              <th className="p-3 text-md text-left font-medium text-gray-500 uppercase">Date</th>
              <th className="p-3 text-md text-left font-medium text-gray-500 uppercase">Description</th>
              <th className="p-3 text-md text-left font-medium text-gray-500 uppercase">Amount</th>
              <th className="p-3 text-md text-left font-medium text-gray-500 uppercase">Category</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {sampleTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="text-sm p-3 whitespace-nowrap">{transaction.date}</td>
                <td className="text-sm p-3 whitespace-nowrap">{transaction.description}</td>
                <td className="text-sm p-3 whitespace-nowrap">{transaction.amount}</td>
                <td className="text-sm p-3 whitespace-nowrap">{transaction.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;
