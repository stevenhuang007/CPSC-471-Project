import axios from "axios";
import { useEffect, useState } from "react";


const PlayerStats = () => {
  const [players, setplayerStats] = useState([])
  const [physical_casino, setPS] = useState([])
  

  useEffect(()=>{
    const fetchAllPS = async()=>{
      try{
        const res = await axios.get("http://localhost:8800/player")
        setplayerStats(res.data);
        console.log(res);
      }catch(err){
        console.log(err);
      }
      
    }
    fetchAllPS()
  }, [])

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

        <div>
          {players.map(player=>(
            <div>
             {player.Player_ID}
            </div>
          ))}
        </div>
      
             
      </div>
{/* Centered box */}
<div className="flex justify-center mt-6">
  <div className="w-full max-w-xl">
    <div className="grid grid-cols-1 gap-6">
      
      {/* Casino checkboxes */}
      <div>
        <h3 className="text-md font-bold mb-2">Select Casino</h3>
        {["MGM Grand", "Ceasers", "Venetian", "Bellagio", "Renaissance", "Excalibur"].map((casino) => (
          <div key={casino} className="mb-2">
            <label className="flex items-center">
              <input type="checkbox" value={casino} className="mr-2" />
              {casino}
            </label>
          </div>
        ))}
      </div>

      {/* Table games checkboxes */}
      <div>
        <h3 className="text-md font-bold mb-2">Select Table Game</h3>
        {["Roulette", "Black Jack", "Poker", "Baccarat", "Craps", "Texas Hold'em"].map((game) => (
          <div key={game} className="mb-2">
            <label className="flex items-center">
              <input type="checkbox" value={game} className="mr-2" />
              {game}
            </label>
          </div>
        ))}
      </div>

      {/* Machine games checkboxes */}
      <div>
        <h3 className="text-md font-bold mb-2">Select Machine Game</h3>
        {["Slotomania", "Roulette Machine", "Poker Machine", "5 DRAGONS"].map((machine) => (
          <div key={machine} className="mb-2">
            <label className="flex items-center">
              <input type="checkbox" value={machine} className="mr-2" />
              {machine}
            </label>
          </div>
        ))}
      </div>

      {/* Filters Section */}
      <div className="text-center text-gray-600 italic">
        <p>Select a filter you would like to apply (multiple can be selected).</p>
        <p>(If none selected, all will be applied.)</p>
      </div>

      {/* Specific statistic checkboxes */}
      <div>
        <h3 className="text-md font-bold mb-2">Select Specific Statistic</h3>
        {[
          { id: "amount-won", label: "Amount Won" },
          { id: "winning-hand", label: "Winning Hand (certain table/machine games)" },
          { id: "number-games-played", label: "Number of Games Played" },
        ].map((stat) => (
          <div key={stat.id} className="mb-2">
            <label className="flex items-center">
              <input type="checkbox" id={stat.id} value={stat.label} className="mr-2" />
              {stat.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

    </div>
  );
}

export default PlayerStats;
