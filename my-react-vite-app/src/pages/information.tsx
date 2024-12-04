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
          <div className="grid grid-cols-2 gap-4 items-center mt-5">
            
              {/* Label and Dropdown (Enter Casino) */}
              <label htmlFor="casino" className="text-lg mr-4">Enter Casino:</label>
              <select
                id="casino"
                className="p-2 border border-gray-300 rounded-md w-full max-w-60"
              >
                <option value="">Select...</option>
                <option value="casino1">Casino 1</option>
                <option value="casino1">Casino 2</option>
                <option value="casino1">Casino 3</option>
                <option value="casino1">Casino 4</option>
                <option value="casino1">Casino 5</option>
              </select>

            {/* Label and Dropdown (Enter Table or Machine ID) */}
              <label htmlFor="table-machine" className="text-lg mr-4">Enter Table or Machine ID:</label>
              <select
                id="table-machine"
                className="p-2 border border-gray-300 rounded-md w-full max-w-60"
              >
                <option value="">Select...</option>
                <option value="table1">Table 1</option>
                <option value="table2">Table 2</option>
                <option value="table2">Table 3</option>
                <option value="table2">Table 4</option>
                <option value="machine1">Machine 1</option>
                <option value="machine2">Machine 2</option>
                <option value="machine2">Machine 3</option>
                <option value="machine2">Machine 4</option>
              </select>
            
              <label htmlFor="game" className="text-lg mr-4">Enter Game:</label>
              <select
                id="game"
                className="p-2 border border-gray-300 rounded-md w-full max-w-60"
              >
                <option value="">Select...</option>
                <option value="game1">Blackjack</option>
                <option value="game1">Poker</option>
                <option value="game1">Craps</option>
                <option value="game1">Baccarat</option>
                <option value="game1">Texas Hold'em</option>
                <option value="game1">Roulette</option>
                <option value="game1">Slots</option>




              </select>
            
            {/* Label and Text Box (Amount Bet) */}
              <label htmlFor="amount-bet" className="text-lg mr-4">Enter Amount Bet:</label>
              <input
                type="text"
                id="amount-bet"
                className="p-2 border border-gray-300 rounded-md w-60"
                placeholder="Bet Amount (ex: 5, 10)"
              />

            {/* Label and Text Box (Amount Won/Loss) */}
              <label htmlFor="amount-w-l" className="text-lg mr-4">Enter Amount Won/Loss:</label>
              <input
                type="text"
                id="amount-w-l"
                className="p-2 border border-gray-300 rounded-md w-60"
                placeholder="Winnings/Losings (ex: 5, -5)"
              />

            {/* Label and Text Box (Dealer ID) */}
              <label htmlFor="dealer-id" className="text-lg mr-4">Enter Dealer ID (N/a if machine used):</label>
              <input
                type="text"
                id="dealer-id"
                className="p-2 border border-gray-300 rounded-md w-60"
                placeholder="Dealer ID (N/a if Machine)"
              />

            {/* Label and Text Box (Date) */}
              <label htmlFor="date" className="text-lg mr-4">Enter Date:</label>
              <input
                type="text"
                id="date"
                className="p-2 border border-gray-300 rounded-md w-60"
                placeholder="YYYY-MM-DD"
              />
          </div>
          <div className="flex justify-center mt-10">
            <button className="bg-green-400 border-4 border-gray-600 p-2 hover:opacity-80 rounded-full">Submit</button>
          </div>
        </div>  
      </div>
    </div>
  );
}

export default Information;
