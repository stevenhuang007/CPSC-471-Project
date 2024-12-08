import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Information = () => {
  const [hand_info, setHandInfo] = useState({
    casino: "",
    table_id: "",
    game: "",
    amount_bet: "",
    amount_won_loss: "",
    date: "",
  });

  const [error, setError] = useState(""); // State for error message
  const [confirmation, setConfirmation] = useState(""); // State for confirmation message
  const navigate = useNavigate();

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;

    // Validate `amount_bet` input to allow only positive integers
    if (name === "amount_bet" && (value === "" || !/^\d+$/.test(value))) {
      setError("Amount Bet must be a positive integer.");
      setHandInfo((prev) => ({ ...prev, [name]: "" })); // Clear invalid value
      return;
    }

    setError(""); // Clear any error if input is valid
    setHandInfo((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { casino, table_id, game, amount_bet, amount_won_loss, date } = hand_info;

    if (!casino || !table_id || !game || !amount_bet || !amount_won_loss || !date) {
      return "All fields except Dealer ID must be filled out.";
    }

    if (parseInt(amount_bet, 10) <= 0) {
      return "Invalid bet. Amount Bet must be greater than zero.";
    }

    return "";
  };

  const handleClick = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      setError(errorMessage); // Set error message if validation fails
      return;
    }
    setError(""); // Clear error if validation passes
    try {
      await axios.post("http://localhost:8800/hand_info", hand_info);
      setConfirmation("Data entry complete!"); // Set confirmation message
      setTimeout(() => {
        navigate("/"); // Redirect after showing message
      }, 2000); // Redirect after 2 seconds
    } catch (err) {
      console.log(err);
      setError("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">Enter Hand Information</h1>
        <p className="text-lg">
          Here you can enter the results of your hand that will be incorporated into your user database.
        </p>
      </div>

      {/* Error Message Display */}
      {error && (
        <div className="bg-red-200 text-red-800 p-4 rounded-md mb-4">
          {error}
        </div>
      )}

      {/* Confirmation Message Display */}
      {confirmation && (
        <div className="bg-green-200 text-green-800 p-4 rounded-md mb-4">
          {confirmation}
        </div>
      )}

      <div className="flex justify-center mt-6">
        <div className="w-full max-w-xl">
          <div className="grid grid-cols-2 gap-4 items-center mt-5">
            {/* Form inputs and labels */}
            <label htmlFor="casino" className="text-lg mr-4">Enter Casino:</label>
            <select
              onChange={handleChange}
              name="casino"
              id="casino"
              className="p-2 border border-gray-300 rounded-md w-full max-w-60"
            >
              <option value="">Select...</option>
              <option value="casino1">Casino 1</option>
              <option value="casino2">Casino 2</option>
              <option value="casino3">Casino 3</option>
              <option value="casino4">Casino 4</option>
              <option value="casino5">Casino 5</option>
            </select>

            <label htmlFor="table-machine" className="text-lg mr-4">Enter Table or Machine ID:</label>
            <select
              onChange={handleChange}
              name="table_id"
              id="table-machine"
              className="p-2 border border-gray-300 rounded-md w-full max-w-60"
            >
              <option value="">Select...</option>
              <option value="table1">Table 1</option>
              <option value="table2">Table 2</option>
              <option value="table3">Table 3</option>
              <option value="table4">Table 4</option>
              <option value="machine1">Machine 1</option>
              <option value="machine2">Machine 2</option>
              <option value="machine3">Machine 3</option>
              <option value="machine4">Machine 4</option>
            </select>

            <label htmlFor="game" className="text-lg mr-4">Enter Game:</label>
            <select
              onChange={handleChange}
              name="game"
              id="game"
              className="p-2 border border-gray-300 rounded-md w-full max-w-60"
            >
              <option value="">Select...</option>
              <option value="blackjack">Blackjack</option>
              <option value="poker">Poker</option>
              <option value="craps">Craps</option>
              <option value="baccarat">Baccarat</option>
              <option value="texas_holdem">Texas Hold'em</option>
              <option value="roulette">Roulette</option>
              <option value="slots">Slots</option>
            </select>

            <label htmlFor="amount-bet" className="text-lg mr-4">Enter Amount Bet:</label>
            <input
              onChange={handleChange}
              name="amount_bet"
              type="text" // Use "text" for better input validation control
              id="amount-bet"
              className="p-2 border border-gray-300 rounded-md w-60"
              placeholder="Bet Amount (ex: 5, 10)"
              value={hand_info.amount_bet}
            />

            <label htmlFor="amount-w-l" className="text-lg mr-4">Enter Amount Won/Loss:</label>
            <input
              onChange={handleChange}
              name="amount_won_loss"
              type="number"
              id="amount-w-l"
              className="p-2 border border-gray-300 rounded-md w-60"
              placeholder="Winnings/Losings (ex: 5, -5)"
            />

            <label htmlFor="date" className="text-lg mr-4">Enter Date:</label>
            <input
              onChange={handleChange}
              name="date"
              type="text"
              id="date"
              className="p-2 border border-gray-300 rounded-md w-60"
              placeholder="YYYY-MM-DD"
            />
          </div>
          <div className="flex justify-center mt-10">
            <button onClick={handleClick} className="bg-green-400 border-4 border-gray-600 p-2 hover:opacity-80 rounded-full">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
