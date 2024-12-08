import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/home";
import PlayerStats from "./pages/playerstats";
import Information from "./pages/information";
import BudgetTracker from "./pages/budgetTracker";
import Test from "./pages/test"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="playerstats" element={<PlayerStats />} />
          <Route path="information" element={<Information />} />
          <Route path="budgetTracker" element={<BudgetTracker />} />
          <Route path="test" element={<Test/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
