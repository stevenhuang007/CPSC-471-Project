import React, { useState, useEffect } from "react";
import axios from "axios";

interface SummaryData {
  most_visited_casino: string;
  most_played_game: string;
  total_won: number;
  total_lost: number;
}

interface Transaction {
  Id: number;
  Casino_name: string;
  Description: string;
  Amount: number;
  Date: string;
}

const BudgetTracker: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [formData, setFormData] = useState({
    Casino_name: "",
    Description: "",
    Amount: "",
    Date: "",
  });
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages

  useEffect(() => {
    // Fetch transactions based on current page
    axios
      .get(`http://localhost:8800/tracker?page=${currentPage}&limit=4`) // Fetch 4 entries per page
      .then((response) => {
        setTransactions(response.data.data);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => console.error("Error fetching transactions:", error));

    // Fetch summary data
    axios
      .get("http://localhost:8800/tracker/summary")
      .then((response) => setSummary(response.data))
      .catch((error) => console.error("Error fetching summary:", error));
  }, [currentPage]); // Re-fetch when currentPage changes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:8800/tracker", {
        ...formData,
        Amount: parseInt(formData.Amount, 10),
      })
      .then((response) => {
        // Add the new transaction to the current transactions
        setTransactions((prev) => [
          {
            Id: response.data.id,
            ...formData,
            Amount: parseInt(formData.Amount, 10),
          },
          ...prev,
        ]);

        // Clear the form
        setFormData({ Casino_name: "", Description: "", Amount: "", Date: "" });

        // Re-fetch the summary data
        return axios.get("http://localhost:8800/tracker/summary");
      })
      .then((summaryResponse) => {
        setSummary(summaryResponse.data); // Update the summary
      })
      .catch((error) =>
        console.error("Error saving transaction or updating summary:", error)
      );
  };

  // Format amount to display as $ for positive and -$ for negative amounts
  const formatAmount = (amount: number) => {
    if (amount < 0) {
      return `-$${Math.abs(amount)}`;
    }
    return `$${amount}`;
  };

  // Handle page changes
  const changePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gambling Tracker</h1>

      {/* Summary Section */}
      {summary && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Most Visited Casino */}
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <h3 className="text-lg font-semibold">Most Visited Casino</h3>
            <p className="text-sm">{summary.most_visited_casino || "N/A"}</p>
          </div>

          {/* Most Played Game */}
          <div className="bg-teal-500 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <h3 className="text-lg font-semibold">Most Played Game</h3>
            <p className="text-sm">{summary.most_played_game || "N/A"}</p>
          </div>

          {/* Total Won */}
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <h3 className="text-lg font-semibold">Total Won</h3>
            <p className="text-sm">{formatAmount(summary.total_won || 0)}</p>
          </div>

          {/* Total Lost */}
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
            <h3 className="text-lg font-semibold">Total Lost</h3>
            <p className="text-sm">
              {formatAmount(Math.abs(summary.total_lost || 0))}
            </p>
          </div>
        </div>
      )}

      {/* Transaction Form */}
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
            placeholder="Enter the name of the casino"
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
            placeholder="Enter a description of the game or the transaction"
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
            placeholder="Enter the amount won or lost (use negative for losses)"
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
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Add Transaction
        </button>
      </form>

      {/* Transactions */}
      <ul>
        {transactions.map((transaction) => (
          <li
            key={transaction.Id}
            className="border p-4 rounded mb-4 hover:shadow-lg transition duration-300"
          >
            <p className="text-lg font-semibold">{transaction.Casino_name}</p>
            <p className="text-sm text-gray-600">{transaction.Description}</p>
            <p
              className={`text-sm ${
                transaction.Amount < 0 ? "text-red-600" : "text-green-600"
              } font-semibold`}
            >
              Amount: {formatAmount(transaction.Amount)}
            </p>
            <p className="text-sm">Date: {transaction.Date}</p>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BudgetTracker;
