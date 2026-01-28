import useTicTacToe from "./hooks/useTicTacToe";
import "./style.css";

function TicTacToe({ boardSize = 16 }: { boardSize?: number }) {
  const n = Math.sqrt(boardSize);
  const { board, getStatusMessage, handleClick, restart } = useTicTacToe(
    n,
    boardSize,
  );
  if (!Number.isInteger(n)) {
    return <div>Invalid board size!</div>;
  }

  return (
    <div className="app">
      <div className="header">
        <h4 className="status">{getStatusMessage()}</h4>
        <button onClick={restart}>Restart</button>
      </div>
      <div
        className="tic-tac-toe"
        style={{
          // @ts-ignore
          "--row-count": n,
        }}
      >
        {board.map((b, i) => (
          <button
            className="tic-tac-toe-btn"
            onClick={handleClick(i)}
            disabled={b !== null}
            key={i}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TicTacToe;
