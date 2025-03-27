import React from "react";

const Register = () => {
  return (
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
  );
};

export default Register;
