import Dropdown from "../dropdown";

function Information() {
  return (
    <div className="min-h-screen p-6">
      {/* Section for Header and Intro Text */}
      <div>
        <h1 className="text-3xl font-bold mb-4">Enter Hand Information</h1>
        <p className="text-lg">
          Here you can enter the results of your hand that will be incorporated into your user database.
        </p>
      </div>

      {/* Centered Grid Layout */}
      <div className="flex justify-center mt-6">
        <div className="w-full max-w-xl">
          <div className="grid grid-cols-1 gap-4">
            {/* Label and Dropdown (Select Table or Machine) */}
            <div className="flex items-center">
              <label htmlFor="table-machine" className="text-lg mr-4">Select Table or Machine</label>
              <select
                id="table-machine"
                className="p-2 border border-gray-300 rounded-md w-full max-w-xs"
              >
                <option value="">Select...</option>
                <option value="table1">Table 1</option>
                <option value="table2">Table 2</option>
                <option value="machine1">Machine 1</option>
                <option value="machine2">Machine 2</option>
              </select>
            </div>

            {/* Label and Text Box (Hand Result) */}
            <div className="flex items-center">
              <label htmlFor="hand-result" className="text-lg mr-4">Hand Result:</label>
              <input
                type="text"
                id="hand-result"
                className="p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter hand result"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;
