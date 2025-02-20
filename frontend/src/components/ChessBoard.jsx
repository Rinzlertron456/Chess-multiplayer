import React, { useState, useEffect } from "react";

const ChessBoard = ({ board, socket, onPieceMove }) => {
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

  const handleSquares = (convertedSq) => {
    if (!from) {
      setFrom(convertedSq);
    } else {
      setTo(convertedSq);
    }
  };

  const handlePieceColor = (sq) => {
    console.log(sq);
  };

  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const numbers = [8, 7, 6, 5, 4, 3, 2, 1];

  return (
    <div className="text-white">
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
      {board.map((row, i) => {
        return (
          <div key={i} className="flex">
            <div className="w-8 h-16 flex justify-center items-center text-white font-bold">
              {numbers[i]}
            </div>
            {row.map((square, j) => {
              const convertedSquare =
                String.fromCharCode(97 + (j % 8)) + "" + (8 - i); //97 is the start of small letters ascii code
              return (
                <div
                  onClick={() => handleSquares(convertedSquare)}
                  key={j}
                  className={`w-16 h-16 ${
                    (i + j) % 2 === 0 ? "bg-blue-900" : "bg-blue-200"
                  }`}
                >
                  <div
                    className="w-full justify-center flex h-full"
                    onClick={() => handlePieceColor(square)}
                  >
                    <div className="h-full justify-center flex flex-col text-black">
                      {/* arranged pieces svg names based on the square objects type
                      notation */}
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
            <div className="w-8 h-16 flex justify-center items-center text-white font-bold">
              {numbers[i]}
            </div>
          </div>
        );
      })}
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
