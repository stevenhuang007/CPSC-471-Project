import axios from "axios";
import { useEffect, useState } from "react";

const PlayerStats = () => {
  const [formData, setFormData] = useState({
    casino: "",
    machine_or_table: "",
    game: "",
  });

  const [error, setError] = useState("");
  const [hand_info, setHandInfo] = useState([]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const filteredRows = hand_info.filter((row) => {
    return (
      (!formData.casino || row.casino === formData.casino) &&
      (!formData.machine_or_table || row.table_id === formData.machine_or_table) &&
      (!formData.game || row.game === formData.game)
    );
  });

  return (
    <div className="min-h-screen bg-[#FCF5ED] text-[#1F1717] p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-8 text-[#1F1717]">
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-[#CE5A67] to-[#F4BF96] text-transparent bg-clip-text">
          Player Stats Query
        </h1>
        <p className="text-lg text-center mt-2 text-[#1F1717]">
          Select the criteria below to query and filter the player stats.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div>
            <label htmlFor="casino" className="block text-lg font-semibold mb-2">
              Select Casino:
            </label>
            <select
              onChange={handleChange}
              name="casino"
              id="casino"
              className="w-full px-4 py-2 bg-[#FCF5ED] border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-[#F4BF96] transition hover:shadow-lg"
            >
              <option value="">Select Casino...</option>
              <option value="casino1">Casino 1</option>
              <option value="casino2">Casino 2</option>
              <option value="casino3">Casino 3</option>
              <option value="casino4">Casino 4</option>
              <option value="casino5">Casino 5</option>
            </select>
          </div>

          <div>
            <label htmlFor="machine_or_table" className="block text-lg font-semibold mb-2">
              Select Machine or Table:
            </label>
            <select
              onChange={handleChange}
              name="machine_or_table"
              id="machine_or_table"
              className="w-full px-4 py-2 bg-[#FCF5ED] border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-[#F4BF96] transition hover:shadow-lg"
            >
              <option value="">Select Machine or Table...</option>
              <option value="machine1">Machine 1</option>
              <option value="machine2">Machine 2</option>
              <option value="machine3">Machine 3</option>
              <option value="machine4">Machine 4</option>
              <option value="table1">Table 1</option>
              <option value="table2">Table 2</option>
              <option value="table3">Table 3</option>
              <option value="table4">Table 4</option>
            </select>
          </div>

          <div>
            <label htmlFor="game" className="block text-lg font-semibold mb-2">
              Select Game:
            </label>
            <select
              onChange={handleChange}
              name="game"
              id="game"
              className="w-full px-4 py-2 bg-[#FCF5ED] border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-[#F4BF96] transition hover:shadow-lg"
            >
              <option value="">Select Game...</option>
              <option value="blackjack">Blackjack</option>
              <option value="poker">Poker</option>
              <option value="craps">Craps</option>
              <option value="baccarat">Baccarat</option>
              <option value="texas_holdem">Texas Hold'em</option>
              <option value="roulette">Roulette</option>
              <option value="slots">Slots</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mt-4 text-red-500 text-center">
            {error}
          </div>
        )}

        <div className="mt-10 overflow-x-auto">
          {filteredRows.length > 0 ? (
            <table className="w-full border border-gray-300 shadow-lg rounded-md">
              <thead className="bg-[#CE5A67] text-white">
                <tr>
                  {Object.keys(filteredRows[0]).map((column) => (
                    <th
                      key={column}
                      className="px-4 py-3 text-left font-semibold border-b border-gray-300"
                    >
                      {column.replace(/_/g, " ").toUpperCase()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
                  <tr
                    key={index}
                    className={`transition ${
                      index % 2 === 0 ? "bg-[#FCF5ED]" : "bg-white"
                    } hover:bg-[#F4BF96]/50`}
                  >
                    {Object.keys(row).map((column) => (
                      <td
                        key={column}
                        className="px-4 py-3 border-b border-gray-300"
                      >
                        {row[column] || "N/A"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-lg mt-4 text-[#1F1717]">
              No data matches your selection.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;
