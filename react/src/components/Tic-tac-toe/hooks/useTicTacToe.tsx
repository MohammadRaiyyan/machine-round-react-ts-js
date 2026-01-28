import { useState } from "react";

const initialBoard = (size: number) => Array(size).fill(null);

function generateWinningPatterns(n: number): number[][] {
  const rows = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => i * n + j),
  );

  const cols = Array.from({ length: n }, (_, j) =>
    Array.from({ length: n }, (_, i) => i * n + j),
  );

  const mainDiag = [Array.from({ length: n }, (_, i) => i * (n + 1))];

  const antiDiag = [Array.from({ length: n }, (_, i) => (i + 1) * (n - 1))];

  return [...rows, ...cols, ...mainDiag, ...antiDiag];
}

const calculateWinner = (board: Array<string | null>, rowSize: number) => {
  const WINNING_PATTERNS = generateWinningPatterns(rowSize);
  for (const pattern of WINNING_PATTERNS) {
    const first = board[pattern[0]];
    if (first && pattern.every((idx) => board[idx] === first)) {
      return first;
    }
  }
  return null;
};

function useTicTacToe(rowSize: number, boardSize: number) {
  const [board, setBoard] = useState<Array<string | null>>(
    initialBoard(boardSize),
  );
  const [isNextTurn, setIsNextTurn] = useState(true);

  const handleClick = (index: number) => {
    return () => {
      const isWinner = calculateWinner(board, rowSize);
      if (isWinner || board[index] !== null) return;
      const copyBoards = [...board];
      copyBoards[index] = isNextTurn ? "X" : "O";
      setBoard(copyBoards);
      setIsNextTurn(!isNextTurn);
    };
  };

  const getStatusMessage = () => {
    const isWinner = calculateWinner(board, rowSize);
    if (isWinner) {
      if (isWinner === "X") {
        return `Player X won!`;
      } else if (isWinner === "O") {
        return `Player O won!`;
      }
    } else if (!board.includes(null)) {
      setIsNextTurn(true);
      return "It's a draw! Restart the game";
    }
    return `Player ${isNextTurn ? "X's" : "O's"} turn`;
  };
  const restart = () => {
    setBoard(initialBoard(boardSize));
    setIsNextTurn(true);
  };

  return {
    board,
    getStatusMessage,
    handleClick,
    restart,
  };
}

export default useTicTacToe;
