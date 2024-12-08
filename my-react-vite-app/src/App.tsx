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
import Test from "./pages/test"
import LoginPage from "./pages/loginpage";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true); // Set logged-in state to true after login
  };

  return (
    <Router>
      <Routes>
        {/* Protected routes: If logged in, show the main app routes */}
        <Route element={isLoggedIn ? <Layout /> : <Navigate to="/login" />}>
          <Route index element={<Home />} />
          <Route path="playerstats" element={<PlayerStats />} />
          <Route path="information" element={<Information />} />
          <Route path="budgetTracker" element={<BudgetTracker />} />
          <Route path="test" element={<Test/>}/>
        </Route>

        {/* Login page route */}
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

        {/* Catch-all route that redirects to login if user tries to access a non-existent route */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
