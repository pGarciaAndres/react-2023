import { Square } from "./Square";
import PropTypes from "prop-types";

export function Game({ board, updateBoard }) {
  return (
    <section className="game">
      {board.map((x, index) => {
        return (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {x}
          </Square>
        );
      })}
    </section>
  );
}

Game.propTypes = {
  board: PropTypes.array,
  updateBoard: PropTypes.func,
};
