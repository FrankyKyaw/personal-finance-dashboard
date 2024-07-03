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

  return (
    <div className="w-full max-w-md bg-white shadow-sm overflow-hidden rounded-lg border">
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold mb-1">{title}</h2>
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Date:</label>
              <input type="date" name="date"></input>
            </div>
            <div>
              <label>Type:</label>
              <select name="type">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>
          <div>
            <label>Category:</label>
            <select name="category">
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Amount:</label>
            <input type="number" name="amount"></input>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default TransactionInput;
