import React, { useEffect, useState } from "react";
import ChessBoard from "./ChessBoard";
import { Chess } from "chess.js";
import { useSocket } from "./customhooks/useSocket";
import Login from "./Login";
import { USER_DATA } from "../constants/userData";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "GAME_OVER";

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [dots, setDots] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const [started, setStarted] = useState(false);
  const [party, setParty] = useState(null);
  const [showStartedMessage, setShowStartedMessage] = useState(false);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log(message, "at client");

      switch (message.type) {
        case INIT_GAME:
          const newGame = new Chess();
          setBoard(newGame.board());
          setStarted(true);
          setShowStartedMessage(true);
          setParty(message.payload.color);
          console.log("Game Initialized with", message.payload.color);

          setTimeout(() => {
            setShowStartedMessage(false);
          }, 3000); // Hide message after 3s
          break;

        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("Move Made");
          break;

        case GAME_OVER:
          console.log("Game Over");
          break;

        default:
          break;
      }
    };
  }, [socket]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 4 ? prev + "." : ""));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {};

  const handleGamePlay = () => {
    socket.send(
      JSON.stringify({
        type: INIT_GAME,
      })
    );
    console.log(INIT_GAME);
  };

  const handleMoves = ({ from, to }) => {
    console.log({ from, to });
    // Try Catch Error Handling
    try {
      const move = chess.move({ from, to });
      if (move) setBoard(chess.board());
      // else throw new Error("Invalid move");
    } catch (error) {
      console.error(error.message);
      alert("Invalid move");
    }
    // chess.move({ from, to });
    // setBoard(chess.board());
  };

  const handleLoginData = (data) => {
    console.log(data);
    let dbData = USER_DATA;
    let email = data.username;
    let pass = data.password;
    if (!loginStatus) {
      dbData.forEach((record) => {
        if (email === record.username && pass === record.password) {
          setLoginStatus(true);
        } else {
          console.log("wrong credentials");
        }
      });
    } else {
      console.log("error");
    }
  };

  if (!socket) {
    return (
      <div className="bg-green-50 p-4 rounded-md text-lg font-semibold">
        Connecting{dots}
      </div>
    );
  }

  return (
    <div className="justify-center flex">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 w-full">
          {/* Chess Board with Flipping Logic */}
          <div className="col-span-4 w-full flex justify-center">
            <div
              className={`transform ${
                party === "black" ? "rotate-360" : ""
              } transition-transform`}
            >
              <ChessBoard
                onPieceMove={({ from, to }) => handleMoves({ from, to })}
                socket={socket}
                board={board}
                party={party}
              />
            </div>
          </div>

          {/* Right-Side UI */}
          <div className="">
            {/* Play Button Sticks to Top */}
            {!started && (
              <div className="absolute top-4 flex flex-col gap-4">
                <div>
                  <Login
                    handleGamePlay={handleGamePlay}
                    loginStatus={loginStatus}
                    handleLoginData={({ username, password }) =>
                      handleLoginData({ username, password })
                    }
                  />
                </div>
              </div>
            )}

            {/* "Game Started" Message (Fades Away) */}
            {showStartedMessage && (
              <div className="mt-16 text-2xl font-semibold text-white bg-green-600 px-6 py-3 rounded-lg shadow-lg animate-fade-out">
                The game has started!
              </div>
            )}

            {/* Show Current Player */}
            {party && (
              <div className="mt-4 text-xl font-medium text-white bg-blue-500 px-6 py-3 rounded-lg shadow-md">
                {`You are ${party.toUpperCase()}'s now`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
