import confetti from "canvas-confetti";
import { COMBOS, TURNS } from "../constants";
import { resetGameStorage, saveGameStorage } from "./storage";

const checkWinner = (boardToCheck) => {
  for (const combo of COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }

  return null;
};

const checkEndGame = (boardToCheck) => {
  return boardToCheck.every((square) => square !== null);
};

export const updateBoard = ({
  index,
  board,
  setBoard,
  turn,
  setTurn,
  winner,
  setWinner,
}) => {
  if (board[index] || winner) return;

  const newBoard = [...board];
  newBoard[index] = turn;
  setBoard(newBoard);

  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
  setTurn(newTurn);
  saveGameStorage({ board: newBoard, turn: newTurn });

  const newWinner = checkWinner(newBoard);
  if (newWinner) {
    confetti();
    setWinner(newWinner);
  } else if (checkEndGame(newBoard)) {
    setWinner(false);
  }
};

export const resetGame = ({ setBoard, setTurn, setWinner }) => {
  setBoard(Array(9).fill(null));
  const newTurnIndex = Math.floor(Math.random() * 2);
  setTurn(newTurnIndex === 0 ? TURNS.X : TURNS.O);
  setWinner(null);
  resetGameStorage();
};
