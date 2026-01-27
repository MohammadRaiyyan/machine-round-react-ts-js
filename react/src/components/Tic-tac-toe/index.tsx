import "./style.css";

function TicTacToe() {
  const buttons = Array.from(new Array(9));
  return (
    <div className="app">
      <div className="tic-tac-toe">
        {buttons.map((_, i) => (
          <button key={i}>{i}</button>
        ))}
      </div>
    </div>
  );
}

export default TicTacToe;
