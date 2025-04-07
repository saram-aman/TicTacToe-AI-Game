import React, { Component } from 'react';
import { withRouter } from '../utils/withRouter';
import GameResult from './GameResult';

class GameRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            playerSymbol: null,
            opponentJoined: false,
            isWaiting: true,
            winner: null,
            gameDrawn: false,
        };
        this.socket = new WebSocket('wss://tic-tac-toe-ai-server.vercel.app');
    }

    componentDidMount() {
        const { gameId } = this.props.router.params;

        this.socket.onopen = () => {
            this.socket.send(JSON.stringify({ type: 'join', gameId }));
        };

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.type === 'start') {
                this.setState({
                    playerSymbol: data.symbol,
                    opponentJoined: true,
                    isWaiting: false
                });
            }

            if (data.type === 'opponent-move') {
                const newSquares = [...this.state.squares];
                newSquares[data.move] = data.player;
                this.setState({ squares: newSquares, xIsNext: true }, this.checkWinner);
            }

            if (data.type === 'game-over') {
                this.setState({ winner: data.winner, gameDrawn: data.draw });
            }
        };
    }

    handleClick(i) {
        const { squares, xIsNext, playerSymbol, isWaiting, winner } = this.state;
        if (squares[i] || !xIsNext || isWaiting || winner) return;

        const newSquares = [...squares];
        newSquares[i] = playerSymbol;

        this.setState({ squares: newSquares, xIsNext: false }, () => {
            const { gameId } = this.props.router.params;
            this.socket.send(JSON.stringify({
                type: 'move',
                gameId,
                move: i,
                player: playerSymbol
            }));
            this.checkWinner();
        });
    }

    checkWinner() {
        const lines = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6],
        ];
        const { squares } = this.state;

        for (let [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                this.setState({ winner: squares[a] });
                return;
            }
        }

        if (!squares.includes(null)) {
            this.setState({ gameDrawn: true });
        }
    }

    renderSquare(i) {
        return (
            <button
                className={`w-24 h-24 sm:w-28 sm:h-28 text-3xl font-bold rounded-xl transition
                    ${this.state.squares[i]
                        ? 'bg-gradient-to-br from-gray-600 to-gray-800 text-white cursor-not-allowed'
                        : 'bg-gradient-to-br from-indigo-400 to-purple-500 hover:scale-105 text-white shadow-lg'
                    }`}
                onClick={() => this.handleClick(i)}
                disabled={this.state.squares[i] || this.state.isWaiting || !this.state.xIsNext}
            >
                {this.state.squares[i]}
            </button>
        );
    }

    render() {
        const { winner, playerSymbol, gameDrawn, isWaiting } = this.state;

        return (
            <div className="min-h-screen bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
                <div className="max-w-lg w-full p-6 sm:p-10 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 text-center">
                    <h1 className="text-4xl font-extrabold text-white mb-6 drop-shadow">Battle Arena 🎮</h1>
                    {isWaiting ? (
                        <p className="text-yellow-300 animate-pulse mb-6">Awaiting a worthy opponent...</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-3 gap-4 justify-items-center mb-6">
                                {Array(9).fill(null).map((_, i) => (
                                    <div key={i}>{this.renderSquare(i)}</div>
                                ))}
                            </div>
                            <p className="text-white text-lg font-semibold mb-2">You are: <span className="text-indigo-400">{playerSymbol}</span></p>
                        </>
                    )}

                    {/* Winner/Draw Pop-up */}
                    <GameResult winner={winner} gameDrawn={gameDrawn} playerSymbol={playerSymbol} />

                </div>
            </div>
        );
    }
}

export default withRouter(GameRoom);
