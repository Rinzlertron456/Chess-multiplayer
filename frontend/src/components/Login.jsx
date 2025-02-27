import React, { useState } from "react";
import Button from "./Button";

const Login = ({
  handleGamePlay,
  loginStatus,
  handleLoginData,
  loginMessage,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginData({ username, password });
  };

  return (
    <>
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-80 mt-4">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {!loginStatus ? (
            <div>
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 mt-1 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 mt-1 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          ) : null}

          {loginStatus ? (
            <Button onClick={handleGamePlay} className="text-lg px-6 py-3">
              Play Now
            </Button>
          ) : (
            <Button className="text-lg px-6 py-3">Login</Button>
          )}
          {loginMessage && (
            <div className="w-full p-2 mt-1 bg-gray-700 rounded">
              {loginMessage}
            </div>
          )}
        </form>
      </div>
      <div className="bg-gradient-to-r from-slate-600 to-slate-900 text-white p-6 rounded-2xl shadow-xl w-80 mt-4 border border-white/20">
        <h3 className="text-lg font-semibold mb-2">Sample Test Credentials</h3>
        <p className="text-sm">
          <span className="font-medium">Username:</span> test1, test2 <br />
          <span className="font-medium">Password:</span> 12345678
        </p>
      </div>
    </>
  );
};

export default Login;
