import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation modal
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate `amount_bet` input to allow only positive integers
    if (name === "amount_bet" && (value === "" || !/^\d+$/.test(value))) {
      setError("Amount Bet must be a positive integer.");
      setHandInfo((prev) => ({ ...prev, [name]: "" }));
      return;
    }

    // Validate `amount_won_loss` input
    if (name === "amount_won_loss" && (value === "" || isNaN(value))) {
      setError("Amount Won/Loss must be a valid number.");
      return;
    }

    // Validate `date` input for correct format (YYYY-MM-DD)
    if (name === "date" && value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      setError("Date must be in the format YYYY-MM-DD.");
      return;
    }

    setError(""); // Reset error if input is valid
    setHandInfo((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const { casino, table_id, game, amount_bet, amount_won_loss, date } =
      hand_info;

    // Ensure all required fields are filled
    if (
      !casino ||
      !table_id ||
      !game ||
      !amount_bet ||
      !amount_won_loss ||
      !date
    ) {
      return "All fields except Dealer ID must be filled out.";
    }

    // Validate `amount_bet` to be greater than zero
    if (parseInt(amount_bet, 10) <= 0) {
      return "Invalid bet. Amount Bet must be greater than zero.";
    }

    // Validate `amount_won_loss` to be a valid number (positive or negative)
    if (isNaN(amount_won_loss)) {
      return "Amount Won/Loss must be a valid number.";
    }

    // Validate `date` format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return "Date must be in the format YYYY-MM-DD.";
    }

    return "";
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const errorMessage = validateForm();
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    setError("");

    // Show the confirmation modal before submitting
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    try {
      await axios.post("http://localhost:8800/hand_info", hand_info);
      setConfirmation("Data entry complete!");
      setTimeout(() => {
        navigate("/playerstats");
      }, 2000);
    } catch (err) {
      console.log(err);
      setError(
        "An error occurred while submitting the form. Please try again."
      );
    }
    setShowConfirmation(false); // Close confirmation modal
  };

  const handleCancel = () => {
    setShowConfirmation(false); // Close confirmation modal
  };

  return (
    <div className="min-h-screen p-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">Enter Hand Information</h1>
        <p className="text-lg">
          Here you can enter the results of your hand that will be incorporated
          into your user database.
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

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Your Information</h2>
            <p>Please confirm that the information is correct:</p>
            <ul className="list-disc ml-5 mt-3">
              <li>
                <strong>Casino:</strong> {hand_info.casino}
              </li>
              <li>
                <strong>Table/Machine ID:</strong> {hand_info.table_id}
              </li>
              <li>
                <strong>Game:</strong> {hand_info.game}
              </li>
              <li>
                <strong>Amount Bet:</strong> {hand_info.amount_bet}
              </li>
              <li>
                <strong>Amount Won/Loss:</strong> {hand_info.amount_won_loss}
              </li>
              <li>
                <strong>Date:</strong> {hand_info.date}
              </li>
            </ul>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center mt-6">
        <div className="w-full max-w-xl">
          <div className="grid grid-cols-2 gap-4 items-center mt-5">
            {/* Form inputs and labels */}
            <label htmlFor="casino" className="text-lg mr-4">
              Enter Casino:
            </label>
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

            <label htmlFor="table-machine" className="text-lg mr-4">
              Enter Table or Machine ID:
            </label>
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

            <label htmlFor="game" className="text-lg mr-4">
              Enter Game:
            </label>
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

            <label htmlFor="amount-bet" className="text-lg mr-4">
              Enter Amount Bet:
            </label>
            <input
              onChange={handleChange}
              name="amount_bet"
              type="text"
              id="amount-bet"
              className="p-2 border border-gray-300 rounded-md w-60"
              placeholder="Bet Amount (ex: 5, 10)"
              value={hand_info.amount_bet}
            />

            <label htmlFor="amount-w-l" className="text-lg mr-4">
              Enter Amount Won/Loss:
            </label>
            <input
              onChange={handleChange}
              name="amount_won_loss"
              type="number"
              id="amount-w-l"
              className="p-2 border border-gray-300 rounded-md w-60"
              placeholder="Winnings/Losings (ex: 5, -5)"
            />

            <label htmlFor="date" className="text-lg mr-4">
              Enter Date:
            </label>
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
            <button
              onClick={handleClick}
              className="bg-green-400 border-4 border-gray-600 p-2 hover:opacity-80 rounded-full"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
