import React, { useState, useEffect } from "react";
import axios from "axios";

interface Transaction {
  Id: number;
  Casino_name: string;
  Description: string;
  Amount: number;
  Date: string;
}

const BudgetTracker: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [formData, setFormData] = useState({
    Casino_name: "",
    Description: "",
    Amount: "",
    Date: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8800/tracker")
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:8800/tracker", {
        ...formData,
        Amount: parseInt(formData.Amount),
      })
      .then((response) => {
        setTransactions((prev) => [
          {
            Id: response.data.id,
            ...formData,
            Amount: parseInt(formData.Amount),
          },
          ...prev,
        ]);
        setFormData({ Casino_name: "", Description: "", Amount: "", Date: "" });
      })
      .catch((error) => console.error("Error saving transaction:", error));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gambling Tracker</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium">Casino Name</label>
          <input
            type="text"
            name="Casino_name"
            value={formData.Casino_name}
            onChange={(e) =>
              setFormData({ ...formData, Casino_name: e.target.value })
            }
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <input
            type="text"
            name="Description"
            value={formData.Description}
            onChange={(e) =>
              setFormData({ ...formData, Description: e.target.value })
            }
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Amount</label>
          <input
            type="number"
            name="Amount"
            value={formData.Amount}
            onChange={(e) =>
              setFormData({ ...formData, Amount: e.target.value })
            }
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Date</label>
          <input
            type="date"
            name="Date"
            value={formData.Date}
            onChange={(e) => setFormData({ ...formData, Date: e.target.value })}
            className="border rounded p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Transaction
        </button>
      </form>

      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.Id} className="border p-4 rounded mb-4">
            <p className="text-lg font-semibold">{transaction.Casino_name}</p>
            <p className="text-sm text-gray-600">{transaction.Description}</p>
            <p className="text-sm">Amount: ${transaction.Amount}</p>
            <p className="text-sm">Date: {transaction.Date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetTracker;
