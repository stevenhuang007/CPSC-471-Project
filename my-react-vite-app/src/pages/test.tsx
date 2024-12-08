import axios from "axios";
import { useEffect, useState } from "react";

const YourComponent = () => {
  const [formData, setFormData] = useState({
    casino: "",
    table_id: "",
    game: "",
    amount_bet: false,
    amount_won_loss: false,
    dealer_id: false,
    date: false,
  });

  const [error, setError] = useState('');
  const [players, setplayerStats] = useState([]);
  const [hand_info, setHandInfo] = useState([]);
  const [showTable, setShowTable] = useState(false); // Control table visibility

  useEffect(() => {
    const fetchAllHI = async () => {
      try {
        const res = await axios.get("http://localhost:8800/hand_info");
        setHandInfo(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllHI();
  }, []);

  useEffect(() => {
    const fetchAllPS = async () => {
      try {
        const res = await axios.get("http://localhost:8800/player");
        setplayerStats(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPS();
  }, []);

  // Handle checkbox and dropdown changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleClick = () => {
    // Check if at least one dropdown or checkbox is selected
    if (
      Object.values(formData).some((value) => value !== "" && value !== false)
    ) {
      setError('');
      setShowTable(true); // Show table if there's a valid selection
    } else {
      setError("Please select at least one option.");
      setShowTable(false); // Hide table if no valid selection
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div>
        <h1 className="text-3xl font-bold mb-4 text-left">Select Query Information</h1>
        <p className="text-lg text-left">
          Here you can select certain aspects of your profile you wish to query.
        </p>
      </div>

      <div className="flex justify-center mt-6">
        <div className="w-full max-w-xl">
          <div className="flex flex-col gap-4 mt-5">
            {/* Casino Dropdown */}
            <div className="flex items-center">
              <label htmlFor="casino" className="text-lg w-40 text-right mr-4">Select Casino:</label>
              <select
                onChange={handleChange}
                name="casino"
                id="casino"
                className="p-2 border border-gray-300 rounded-md w-64"
              >
                <option value="">Select Casino...</option>
                <option value="casino1">Casino 1</option>
                <option value="casino2">Casino 2</option>
                <option value="casino3">Casino 3</option>
                <option value="casino4">Casino 4</option>
                <option value="casino5">Casino 5</option>
              </select>
            </div>

            {/* Machines Dropdown */}
            <div className="flex items-center">
              <label htmlFor="machines" className="text-lg w-40 text-right mr-4">See Machines:</label>
              <select
                onChange={handleChange}
                name="machines"
                id="machines"
                className="p-2 border border-gray-300 rounded-md w-64"
              >
                <option value="">Select Machine...</option>
                <option value="machine1">Machine 1</option>
                <option value="machine2">Machine 2</option>
                <option value="machine3">Machine 3</option>
                <option value="machine4">Machine 4</option>
              </select>
            </div>

            {/* Tables Dropdown */}
            <div className="flex items-center">
              <label htmlFor="tables" className="text-lg w-40 text-right mr-4">See Tables:</label>
              <select
                onChange={handleChange}
                name="table_id"
                id="tables"
                className="p-2 border border-gray-300 rounded-md w-64"
              >
                <option value="">Select Table...</option>
                <option value="table1">Table 1</option>
                <option value="table2">Table 2</option>
                <option value="table3">Table 3</option>
                <option value="table4">Table 4</option>
              </select>
            </div>

            {/* Game Dropdown */}
            <div className="flex items-center">
              <label htmlFor="game" className="text-lg w-40 text-right mr-4">Select Game:</label>
              <select
                onChange={handleChange}
                name="game"
                id="game"
                className="p-2 border border-gray-300 rounded-md w-64"
              >
                <option value="">Select Game...</option>
                <option value="game1">Game 1</option>
                <option value="game2">Game 2</option>
                <option value="game3">Game 3</option>
                <option value="game4">Game 4</option>
              </select>
            </div>

            {/* Amount Bet Checkbox */}
            <div className="flex items-center justify-center">
              <input
                onChange={handleChange}
                name="amount_bet"
                type="checkbox"
                id="amount-bet"
                className="mr-2"
              />
              <label htmlFor="amount-bet" className="text-lg">Amount Bet</label>
            </div>

            {/* Amount Won/Loss Checkbox */}
            <div className="flex items-center justify-center">
              <input
                onChange={handleChange}
                name="amount_won_loss"
                type="checkbox"
                id="amount-w-l"
                className="mr-2"
              />
              <label htmlFor="amount-w-l" className="text-lg">Amount Won/Loss</label>
            </div>

            {/* Error Message */}
            {error && <div className="text-red-500 text-lg mt-2">{error}</div>}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-10">
            <button
              onClick={handleClick}
              className="bg-green-400 border-4 border-gray-600 p-2 hover:opacity-80 rounded-full"
            >
              Submit
            </button>
          </div>

          {/* Conditional Table Rendering */}
          {showTable && (
            <div className="mt-4 w-full">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-4 py-2 border border-gray-300">Casino</th>
                    <th className="px-4 py-2 border border-gray-300">Table ID/Machine ID</th>
                    <th className="px-4 py-2 border border-gray-300">Game</th>
                    <th className="px-4 py-2 border border-gray-300">Amount Bet</th>
                    <th className="px-4 py-2 border border-gray-300">Amount Won/Loss</th>
                  </tr>
                </thead>
                <tbody>
                  {hand_info.map((HI) => (
                    <tr key={HI.id} className="text-center">
                      <td className="px-4 py-2 border border-gray-300">{HI.casino}</td>
                      <td className="px-4 py-2 border border-gray-300">{HI.table_id}</td>
                      <td className="px-4 py-2 border border-gray-300">{HI.game}</td>
                      <td className="px-4 py-2 border border-gray-300">{HI.amount_bet}</td>
                      <td className="px-4 py-2 border border-gray-300">{HI.amount_won_loss}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
