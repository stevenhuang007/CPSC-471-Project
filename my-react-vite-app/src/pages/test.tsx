import axios from "axios";
import { useEffect, useState } from "react";

const YourComponent = () => {
  const [formData, setFormData] = useState({
    casino: "",
    machine_or_table: "", // Combined machine and table dropdown
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

  // Handle dropdown changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Filter displayed rows based on selected criteria
  const filteredRows = hand_info.filter((row) => {
    return (
      (!formData.casino || row.casino === formData.casino) &&
      (!formData.machine_or_table || row.machine_or_table === formData.machine_or_table) &&
      (!formData.game || row.game === formData.game)
    );
  });

  return (
    <div className="min-h-screen p-6">
      <div>
        <h1 className="text-3xl font-bold mb-4">Select Query Information</h1>
        <p className="text-lg mb-6">
          Here you can select certain aspects of your profile you wish to query.
        </p>
      </div>

      <div className="flex justify-center mt-6">
        <div className="w-full max-w-xl">
          <div className="flex flex-col gap-6 mt-5 items-center">
            {/* Casino Dropdown */}
            <div className="flex items-center justify-center w-full">
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

            {/* Combined Machines & Tables Dropdown */}
            <div className="flex items-center justify-center w-full">
              <label htmlFor="machine_or_table" className="text-lg w-40 text-right mr-4">Select Machine or Table:</label>
              <select
                onChange={handleChange}
                name="machine_or_table"
                id="machine_or_table"
                className="p-2 border border-gray-300 rounded-md w-64"
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

            {/* Game Dropdown */}
            <div className="flex items-center justify-center w-full">
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

            {/* Error Message */}
            {error && <div className="text-red-500 text-lg mt-2">{error}</div>}
          </div>

          {/* Conditional Table Rendering */}
          {filteredRows.length > 0 && (
            <div className="mt-8 w-full">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    {Object.keys(filteredRows[0]).map((column) => (
                      <th key={column} className="px-4 py-2 border border-gray-300">
                        {column.replace(/_/g, " ").toUpperCase()}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((row, index) => (
                    <tr key={index} className="text-center">
                      {Object.keys(row).map((column) => (
                        <td key={column} className="px-4 py-2 border border-gray-300">
                          {row[column] || "N/A"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {filteredRows.length === 0 && (
            <p className="text-center text-lg text-red-500">No data matches your selection.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
