import { useState } from 'react';
import './styles.css';

type SquareProps = {
  value: string | null;
  onSquareClick: () => void;
  isWinningSquare: boolean;
};

function Square({ value, onSquareClick, isWinningSquare }: SquareProps) {
  return (
    <button 
      className={`square ${isWinningSquare ? 'winning-square' : ''}`} 
      onClick={onSquareClick}
    >
      {value === 'X' ? <span className="x-symbol">{value}</span> : 
       value === 'O' ? <span className="o-symbol">{value}</span> : value}
    </button>
  );
}

type BoardProps = {
  xIsNext: boolean;
  squares: (string | null)[];
  onPlay: (nextSquares: (string | null)[]) => void;
  winningLine: number[] | null;
};

function Board({ xIsNext, squares, onPlay, winningLine }: BoardProps) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) return;
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner.player;
  } else if (squares.every(square => square !== null)) {
    status = 'Game ended in a draw!';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const renderSquare = (i: number) => (
    <Square 
      value={squares[i]} 
      onSquareClick={() => handleClick(i)}
      isWinningSquare={winningLine ? winningLine.includes(i) : false}
    />
  );

  return (
    <div className="game-container">
      <div className="status">{status}</div>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState<{squares: (string | null)[], movePosition?: number}[]>([
    { squares: Array(9).fill(null) }
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;
  const winnerInfo = calculateWinner(currentSquares);
  const winningLine = winnerInfo ? winnerInfo.line : null;

  function handlePlay(nextSquares: (string | null)[], squareIndex: number) {
    const nextHistory = [
      ...history.slice(0, currentMove + 1), 
      { squares: nextSquares, movePosition: squareIndex }
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((step, move) => {
    const desc = move ? 
      `Go to move #${move} (${Math.floor(step.movePosition! / 3)}, ${step.movePosition! % 3})` : 
      'Go to game start';
    
    return (
      <li key={move}>
        <button 
          onClick={() => jumpTo(move)}
          className={currentMove === move ? 'current-move' : ''}
        >
          {desc}
        </button>
      </li>
    );
  });

  return (
    <div className="app">
      <h1>Tic Tac Toe</h1>
      <div className="game">
        <div className="game-board">
          <Board 
            xIsNext={xIsNext} 
            squares={currentSquares} 
            onPlay={(squares) => handlePlay(squares, history.length)} 
            winningLine={winningLine}
          />
        </div>
        <div className="game-info">
          <div className="controls">
            <button onClick={() => setIsAscending(!isAscending)}>
              Sort: {isAscending ? "Ascending" : "Descending"}
            </button>
          </div>
          <ol>{isAscending ? moves : moves.reverse()}</ol>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares: (string | null)[]): {player: string, line: number[]} | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        player: squares[a]!,
        line: [a, b, c]
      };
    }
  }
  return null;
}