import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: () => void; // This function will be called when the user successfully logs in
}

const LoginPage: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation (replace with real authentication logic)
    if (username === "user" && password === "password") {
      onLogin(); // Call onLogin if authentication is successful
      navigate("/"); // Navigate to the homepage ("/") after successful login
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded p-2 w-full"
              placeholder="Enter your password"
              required
            />
          </div>

          {errorMessage && (
            <div className="text-red-600 text-sm mb-4">{errorMessage}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
