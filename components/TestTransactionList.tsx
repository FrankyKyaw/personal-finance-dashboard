import React, { useState, useEffect } from "react";
import { Transaction } from "@/types/transaction";


const TestTransactionList: React.FC<{ transactions: Transaction[] }> = ({
  transactions,
}) => {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>(transactions);


  const handleApplyFilter = () => {
    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date).getTime();
      const start = startDate ? new Date(startDate).getTime() : -Infinity;
      const end = endDate ? new Date(endDate).getTime() : Infinity;
      return transactionDate >= start && transactionDate <= end;
    });
    setFilteredTransactions(filtered);
  };
  
  if (loading) {
    return <p>Loading transactions...</p>;
  }
  return (
    <div className="w-full max-w-4xl px-6 py-4 bg-white mb-10 flex flex-col">
      <div className="mb-4 flex justify-center">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={handleApplyFilter}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Apply Filter
        </button>
      </div>
      <div className="flex-grow rounded-lg border shadow-sm px-6 py-4 overflow-auto">
        <table className="min-w-full divide-y">
          <thead className="">
            <tr>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Merchant
              </th>
              {/* <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th> */}
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.transaction_id}>
                <td className="text-sm p-3 whitespace-nowrap">
                  <div>{new Date(transaction.date).toLocaleDateString()}</div>
                </td>
                <td className="text-sm p-3 whitespace-nowrap">
                  <div>{transaction.merchant_name}</div>
                </td>
                {/* <td className="text-sm p-3 whitespace-nowrap">
                  <div>{transaction.category[0]}</div>
                </td> */}
                <td className="text-sm p-3 whitespace-nowrap">
                  <div
                    className={` font-semibold ${
                      transaction.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ${Math.abs(transaction.amount).toFixed(2)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestTransactionList;
