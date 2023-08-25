import { Square } from "./Square.jsx";
import PropTypes from "prop-types";

export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null;

  const winnerText = winner === false ? "Empate" : "Ganador";
  const buttonText = "Reiniciar";

  return (
    <section className="winner">
      <div className="text">
        <h2>{winnerText}</h2>
        {winner && (
          <header className="win">
            <Square>{winner}</Square>
          </header>
        )}
        <footer>
          <button onClick={resetGame}>{buttonText}</button>
        </footer>
      </div>
    </section>
  );
}

WinnerModal.propTypes = {
  winner: PropTypes.string,
  resetGame: PropTypes.func,
};
