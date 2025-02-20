import React, { useEffect, useState } from "react";
import ChessBoard from "./ChessBoard";
import { Chess } from "chess.js";
import { useSocket } from "./customhooks/useSocket";
import Button from "./Button";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "GAME_OVER";

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board());
  const [dots, setDots] = useState("");
  const [started, setStarted] = useState(false);
  const [party, setParty] = useState(null);

  useEffect(() => {
    if (!socket) return;

    socket.onmessage = (e) => {
      const message = JSON.parse(e.data);

      switch (message.type) {
        case INIT_GAME:
          const newGame = new Chess();
          // setChess(newGame);
          setBoard(newGame.board());
          setStarted(true);
          console.log("Game Initialized");
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

  // Dot Animation Effect
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
    console.log({ from, to });
    /* */
    try {
      chess.move({ from, to });
      setBoard(chess.board());
    } catch (error) {
      console.log(error);
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
          <div className="col-span-4 w-full flex justify-center">
            <ChessBoard
              onPieceMove={({ from, to }) => handleMoves({ from, to })}
              socket={socket}
              board={board}
            />
          </div>
          <div className="col-span-2 bg-slate-900 w-full flex justify-center">
            {!started && (
              <div className="pt-8">
                <Button onClick={handleGamePlay}>Play Now</Button>
              </div>
            )}
            {started && (
              <div className="text-2xl text-white">
                the game has been started
              </div>
            )}
            {party ? (
              <div className="text-2xl text-white">{party}'s move</div>
            ) : (
              <div className="text-2xl text-white">White's move</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
