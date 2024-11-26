function PlayerStats() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Player Stats</h1>
      <p className="text-lg">
        Here, you can view the latest player statistics. Track performance
        metrics, compare players, and see their recent achievements.
      </p>

      {/* Example: Placeholder for future table or chart */}
      <div className="mt-6 border border-gray-300 rounded p-4">
        <p className="text-gray-500 italic">
          Player stats data will be displayed here...
        </p>
      </div>
      {/*Centered box*/}
      <div className="flex justify-center mt-6">
        <div className ="w-full max-w-xl">
          <div className="grid grid-cols-1 gap-6">
          {/* Casino select select*/}
           <div className="flex item-center">
              <label htmlFor="Select Casino" className="text-md mr-4 whitespace-nowrap w-1/3">Select Casino</label>
              <select id="Select Casino" className="p-2 border border-gray-300 rounded-md w-2/3">
                <option value=""> None...</option>
                <option value="MGM Grand">MGM Grand</option>
                <option value="Ceasers">Ceasers</option>
                <option value="Vedara">Vedara</option>
              </select>
            </div>
            {/* table games select*/}
            <div className="flex items-center">
              <label htmlFor = "Select Table Game" className ="text-md mr-4 whitespace-nowrap w-1/3">Select Table Game</label>
              <select id="Select Casino" className="p-2 border border-gray-300 rounded-md w-2/3">
                <option value=""> None...</option>
                <option value="Roulette">Roulette</option>
                <option value="Black Jack">Black Jack</option>
                <option value="Poker">Poker</option>
                <option value="Baccarat">Baccarat</option>
              </select>
            </div>
            {/* Machine games select*/}
            <div className="flex items-center">
              <label htmlFor = "Select Machine Game" className ="text-md mr-4 whitespace-nowrap w-1/3">Select Machine Game</label>
              <select id="Select Casino" className="p-2 border border-gray-300 rounded-md w-2/3">
                <option value=""> None...</option>
                <option value="Slotomania">Slotomania</option>
                <option value="Roulette Machine">Roulette Machine</option>
                <option value="Poker Machine">Poker Machine</option>
                <option value="5 DRAGONS">5 DRAGONS</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerStats;
