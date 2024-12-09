import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./layout";
import Home from "./pages/home";
import PlayerStats from "./pages/playerstats";
import Information from "./pages/information";
import BudgetTracker from "./pages/budgetTracker";
import LoginPage from "./pages/loginpage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        <Route element={isLoggedIn ? <Layout /> : <Navigate to="/login" />}>
          <Route index element={<Home />} />
          <Route path="playerstats" element={<PlayerStats />} />
          <Route path="information" element={<Information />} />
          <Route path="budgetTracker" element={<BudgetTracker />} />
        </Route>

        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
