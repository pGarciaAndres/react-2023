import { useState } from "react";
import { TURNS } from "./constants";
import { WinnerModal } from "./components/WinnerModal.jsx";
import { resetGame, updateBoard } from "./utils/board.js";
import { Turn } from "./components/Turn.jsx";
import { Game } from "./components/Game.jsx";

function App() {
  const title = "TRES EN RALLA";
  const [board, setBoard] = useState(() => {
    const storageBoard = window.localStorage.getItem("board");
    return storageBoard ? JSON.parse(storageBoard) : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const storageTurn = window.localStorage.getItem("turn");
    return storageTurn ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null);

  const handleUpdateBoard = (index) => {
    updateBoard({ index, board, setBoard, turn, setTurn, winner, setWinner });
  };

  const handleResetGame = () => {
    resetGame({ setBoard, setTurn, setWinner });
  };

  return (
    <main className="board">
      <h1>{title}</h1>
      <Game board={board} updateBoard={handleUpdateBoard} />
      <Turn turn={turn} />
      <WinnerModal winner={winner} resetGame={handleResetGame} />
    </main>
  );
}

export default App;
