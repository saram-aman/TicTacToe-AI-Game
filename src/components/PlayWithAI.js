import React, { Component } from 'react';
import GameResult from '../components/GameResult';

class PlayWithAI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null,
    };
  }

  resetGame() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null,
    });
  }

  renderSquare(i) {
    const value = this.state.squares[i];
    return (
      <button
        onClick={() => this.handleClick(i)}
        disabled={value || this.state.winner}
        className={`w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center text-3xl sm:text-4xl font-bold rounded-xl transition-all duration-200 ${
          value === 'X'
            ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white'
            : value === 'O'
            ? 'bg-gradient-to-br from-red-500 to-red-700 text-white'
            : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white'
        }`}
      >
        {value}
      </button>
    );
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (this.calculateWinner(squares) || squares[i]) return;

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState(
      {
        squares: squares,
        xIsNext: !this.state.xIsNext,
      },
      () => {
        const winner = this.calculateWinner(squares);
        if (winner) {
          this.setState({ winner: winner });
        } else if (!this.state.xIsNext) {
          this.makeAIMove();
        }
      }
    );
  }

  makeAIMove() {
    const squares = this.state.squares.slice();
    const emptyIndices = squares
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);

    if (emptyIndices.length > 0) {
      const randomIndex =
        emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      squares[randomIndex] = 'O';
      this.setState(
        {
          squares: squares,
          xIsNext: true,
        },
        () => {
          const winner = this.calculateWinner(squares);
          if (winner) this.setState({ winner: winner });
        }
      );
    }
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return squares[a];
    }
    return null;
  }

  render() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-10 text-center drop-shadow-xl">
          Play Tic-Tac-Toe with AI
        </h1>

        <div className="grid grid-cols-3 gap-4 bg-white/10 p-6 rounded-3xl shadow-lg backdrop-blur-md border border-white/20">
          {Array(9)
            .fill(null)
            .map((_, i) => (
              <div key={i}>{this.renderSquare(i)}</div>
            ))}
        </div>

        <div className="mt-8 w-full max-w-md">
          <GameResult winner={this.state.winner} onRestart={() => this.resetGame()} />
        </div>
      </div>
    );
  }
}

export default PlayWithAI;
