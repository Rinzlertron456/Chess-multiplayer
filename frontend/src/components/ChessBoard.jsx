import React, { useEffect, useState } from "react";

const ChessBoard = ({ board, socket, onPieceMove, party }) => {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  useEffect(() => {
    if (from && to) {
      socket.send(
        JSON.stringify({
          type: "move",
          payload: { move: { from, to } },
        })
      );

      onPieceMove({ from, to });

      setFrom(null);
      setTo(null);
    }
  }, [from, to]);

  const handleSquares = (convertedSq, sqColor) => {
    // Chess Piece Validation to ensure opposite chess pieces positions remain intact
    console.log(convertedSq);
    console.log(sqColor);
    console.log(party[0]);
    //Current try-catch block validation for opposite color piece moves
    try {
      if (!from) {
        if (sqColor === party[0]) {
          setFrom(convertedSq);
        } else {
          alert("Invalid action");
        }
      } else {
        setTo(convertedSq);
      }
    } catch (error) {
      console.error(error);
      alert("Invalid action");
    }

    //Working Validation
    // if (!from && sqColor === party[0]) {
    //   setFrom(convertedSq);
    // } else {
    //   setTo(convertedSq);
    // }
  };

  // Flip board for black player
  const flippedBoard = party === "black" ? [...board].reverse() : board;
  const alphabet =
    party === "black"
      ? ["H", "G", "F", "E", "D", "C", "B", "A"]
      : ["A", "B", "C", "D", "E", "F", "G", "H"];
  const numbers =
    party === "black" ? [1, 2, 3, 4, 5, 6, 7, 8] : [8, 7, 6, 5, 4, 3, 2, 1];

  return (
    <div className="text-white">
      {/* Top Alphabet Row */}
      <div className="flex">
        <div className="w-8 h-8"></div>
        {alphabet.map((letter, index) => (
          <div
            key={index}
            className="w-16 h-8 flex justify-center items-center text-white font-bold"
          >
            {letter}
          </div>
        ))}
      </div>

      {/* Chessboard Rows */}
      {flippedBoard.map((row, i) => {
        return (
          <div key={i} className="flex">
            {/* Left Row Number */}
            <div className="w-8 h-16 flex justify-center items-center text-white font-bold">
              {numbers[i]}
            </div>

            {/* Chess Squares */}
            {(party === "black" ? [...row].reverse() : row).map((square, j) => {
              const realI = party === "black" ? numbers.length - 1 - i : i;
              const realJ = party === "black" ? numbers.length - 1 - j : j;

              const convertedSquare =
                String.fromCharCode(97 + (realJ % 8)) + (8 - realI); // Correct coordinate notation

              return (
                <div
                  onClick={() => handleSquares(convertedSquare, square?.color)}
                  key={j}
                  className={`w-16 h-16 ${
                    (realI + realJ) % 2 === 0 ? "bg-blue-900" : "bg-blue-200"
                  }`}
                >
                  <div className="w-full justify-center flex h-full">
                    <div className="h-full justify-center flex flex-col text-black">
                      {square ? (
                        <img
                          className="w-max"
                          src={`/${
                            square?.color === "b"
                              ? `black-${square?.type}`
                              : `white-${square?.type}`
                          }.svg`}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Right Row Number */}
            <div className="w-8 h-16 flex justify-center items-center text-white font-bold">
              {numbers[i]}
            </div>
          </div>
        );
      })}

      {/* Bottom Alphabet Row */}
      <div className="flex">
        <div className="w-8 h-8"></div>
        {alphabet.map((letter, index) => (
          <div
            key={index}
            className="w-16 h-8 flex justify-center items-center text-white font-bold"
          >
            {letter}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChessBoard;
