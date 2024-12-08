import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "user" && password === "password") {
      onLogin();
      navigate("/");
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#FCF5ED] to-[#CE5A67] p-4">
      <div className="w-full max-w-4xl flex rounded-xl overflow-hidden bg-white shadow-xl">
        {/* Left side - Welcome message */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#CE5A67] to-[#1F1717] p-12 flex-col justify-center relative">
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome back!
            </h1>
            <p className="text-white/80">Sign in to access your account</p>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-8 right-8">
            <div className="w-2 h-2 bg-white/20 rounded-full" />
            <div className="w-2 h-2 bg-white/20 rounded-full mt-2" />
            <div className="w-2 h-2 bg-white/20 rounded-full mt-2" />
          </div>
          <div className="absolute bottom-8 left-8">
            <div className="w-24 h-24 border-2 border-white/10 rounded-full" />
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="max-w-sm mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8">
              Sign In
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CE5A67] focus:border-transparent outline-none transition"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CE5A67] focus:border-transparent outline-none transition"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {errorMessage && (
                <div className="text-[#CE5A67] text-sm">{errorMessage}</div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-[#CE5A67] border-gray-300 rounded focus:ring-[#CE5A67]"
                  />
                  <label className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-[#CE5A67] hover:text-[#F4BF96]"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-[#CE5A67] text-white py-2 px-4 rounded-lg hover:bg-[#F4BF96] transition duration-200"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
