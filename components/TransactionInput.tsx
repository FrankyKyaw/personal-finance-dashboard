"use client";
import React, { useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface TransactionCardProps {
  title: string;
  categories: Category[];
}

interface TransactionData {
  date: string;
  type: "income" | "expense";
  amount: number;
  description: string;
  category: string;
}

const TransactionInput: React.FC<TransactionCardProps> = ({
  title,
  categories,
}) => {
  const [transaction, setTransaction] = useState<TransactionData>({
    date: "",
    type: "income",
    category: "",
    amount: 0,
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setTransaction((prevTransaction) => ({
      ...prevTransaction,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(transaction);
  };
  return (
    <div className="w-full max-w-xl bg-white shadow-sm overflow-hidden rounded-lg border">
      <div className="px-6 py-4">
        <h2 className="text-center text-xl font-medium mb-4">{title}</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date"
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Date:
              </label>
              <input
                type="date"
                id="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                onChange={handleChange}
                required
              ></input>
            </div>
            <div>
              <label
                htmlFor="type"
                className="block text-md font-medium text-gray-700 mb-1"
              >
                Type:
              </label>
              <select
                id="type"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 h-11"
                name="type"
                onChange={handleChange}
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-md font-medium text-gray-700 mb-1"
            >
              Category:
            </label>
            <select
              id="category"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              name="category"
              onChange={handleChange}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="amount"
              className="block text-md font-medium text-gray-700 mb-1"
            >
              Amount:
            </label>
            <input
              id="amount"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              type="number"
              name="amount"
              required
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={handleChange}
              rows={3}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default TransactionInput;
