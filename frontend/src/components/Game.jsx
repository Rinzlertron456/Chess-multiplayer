import React, { useEffect, useState } from "react";
import ChessBoard from "./ChessBoard";
// import { Chess } from "chess.js";
import * as Chess from "chess.js";
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
  const [errorMessage, setErrorMessage] = useState(null);
  const [loginMessage, setLoginMessage] = useState("");

  useEffect(() => {
    if (!socket) return;
    // const apiUrl = process.env.REACT_APP_API_URL;

    // fetch(`${apiUrl}/api/endpoint`)
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));

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

  const handleGamePlay = () => {
    socket.send(
      JSON.stringify({
        type: INIT_GAME,
      })
    );
    console.log(INIT_GAME);
  };

  const handleMoves = ({ from, to }) => {
    try {
      chess.move({ from, to });
      setBoard(chess.board());
    } catch (error) {
      // console.log("Invalid move", error);
      setErrorMessage("Invalid Move");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const handleLoginData = (data) => {
    console.log(data);
    let email = data.username;
    let pass = data.password;

    if (!loginStatus) {
      let userFound = USER_DATA.find(
        (record) => record.username === email && record.password === pass
      );

      if (userFound) {
        setLoginStatus(true);
        setLoginMessage("Logged in successfully");
        setTimeout(() => {
          setLoginMessage("");
        }, 3000);
      } else {
        setLoginMessage("Wrong Credentials");
        setTimeout(() => {
          setLoginMessage("");
        }, 3000);
      }
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
              <ChessBo
                ard
                onPieceMove={({ from, to }) => handleMoves({ from, to })}
                socket={socket}
                board={board}
                party={party}
                errorMessage={errorMessage}
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
                    loginMessage={loginMessage}
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
