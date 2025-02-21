import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center">
      <div className="pt-8 max-w-screen-lg mt-20 w-full">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex justify-center">
            <img src={"/chess.png"} className="max-w-90" />
          </div>
          <div className="pt-5 text-center">
            <div className="flex justify-center">
              <h1 className="text-4xl font-bold text-white">
                Play Chess Online on this Platfrom
              </h1>
            </div>

            <div className="mt-4 flex flex-col gap-3.5 justify-center">
              <div className="pt-3">
                <Button
                  onClick={() => {
                    navigate("/game");
                  }}
                >
                  Play Online
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    navigate("/register");
                  }}
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
