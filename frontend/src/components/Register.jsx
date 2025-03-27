import React, { useRef } from "react";

const Register = () => {
  // const username = "";
  // const password = "";
  const userNameElement = useRef("");
  const userPasswordElement = useRef("");
  const handleSubmit = (e) => {
    // Handle form submission logic here
    e.preventDefault();
    console.log(
      userNameElement.current.value + " " + userPasswordElement.current.value
    );
    console.log("Form submitted");
  };
  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-80">
      <form
        onSubmit={handleSubmit}
        className="flex"
        style={{ margin: "14rem auto 0 auto" }}
      >
        {/* {!loginStatus ? ( */}
        <div>
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              // value={username}
              ref={userNameElement}
              className="w-full p-2 mt-1 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              // value={password}
              ref={userPasswordElement}
              // onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded"
              >
                Register
              </button>
            </div>
          </div>
        </div>
        {/* ) : null} */}

        {/* {loginStatus ? (
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
        )} */}
      </form>
    </div>
  );
};

export default Register;
