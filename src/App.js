import React, { Component } from 'react'
import GameResult from './gameResult'
class TicTacToe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            winner: null,
        }
    }

    resetGame() {
        this.setState({
            squares: Array(9).fill(null),
            xIsNext: true,
            winner: null,
        })
    }

    renderSquare(i) {
        return (
            <button className="square" onClick={() => this.handleClick(i)} disabled={this.state.squares[i] || this.state.winner}>{this.state.squares[i]}</button>
        )
    }

    handleClick(i) {
        const squares = this.state.squares.slice()
        if (this.calculateWinner(squares) || squares[i]) return
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        })
        const winner = this.calculateWinner(squares)
        if (winner) this.setState({ winner: winner})
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
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a]
        }
        return null
    }

    render() {
        return (
            <div className="game">
                <h1 className="text-3xl text-center mt-4 mb-8 text-white">Tic-Tac-Toe</h1>
                <div className="board grid grid-cols-3 gap-2">
                {Array(9).fill(null).map((_, i) => (
                    <div key={i} className="square-container">
                        {this.renderSquare(i)}
                    </div>
                    ))}
                </div>
                <GameResult winner={this.state.winner} onRestart={() => this.resetGame()} />
            </div>
        )
    }
}
export default TicTacToe
