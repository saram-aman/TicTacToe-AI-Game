import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

class PlayWithFriendPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameId: '',
            joinId: '',
            copySuccess: '',
        };
    }

    createGame = () => {
        const newGameId = uuidv4().split('-')[0];
        this.setState({ gameId: newGameId, copySuccess: '' });
    };

    copyToClipboard = () => {
        navigator.clipboard.writeText(this.state.gameId).then(() => {
            this.setState({ copySuccess: 'Copied!' });
            setTimeout(() => this.setState({ copySuccess: '' }), 2000);
        });
    };

    handleJoinChange = (e) => {
        this.setState({ joinId: e.target.value });
    };

    render() {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-purple-900 px-4">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 w-full max-w-md text-center shadow-xl">
                    <h2 className="text-white text-3xl font-bold mb-6">Challenge a Friend 🚀</h2>

                    {!this.state.gameId ? (
                        <button
                            onClick={this.createGame}
                            className="bg-indigo-500 text-white px-6 py-3 rounded-xl hover:bg-indigo-600 transition mb-6 w-full"
                        >
                            Create New Game
                        </button>
                    ) : (
                        <div className="mb-6">
                            <p className="text-white mb-2">Share this Game ID with your buddy:</p>
                            <div className="flex items-center justify-between bg-gray-800 text-white font-mono py-2 px-4 rounded">
                                {this.state.gameId}
                                <button onClick={this.copyToClipboard} className="ml-2 text-sm text-blue-400 hover:text-blue-200">
                                    Copy
                                </button>
                            </div>
                            {this.state.copySuccess && <p className="text-green-300 text-sm mt-1">{this.state.copySuccess}</p>}
                            <Link
                                to={`/game/${this.state.gameId}`}
                                className="block mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl transition w-full"
                            >
                                Enter Game Room 🚪
                            </Link>
                        </div>
                    )}

                    <hr className="my-6 border-white/30" />

                    <p className="text-white mb-2">Join with Game ID:</p>
                    <input
                        type="text"
                        value={this.state.joinId}
                        onChange={this.handleJoinChange}
                        className="w-full px-4 py-2 rounded bg-gray-200 focus:outline-none mb-3"
                        placeholder="Enter Game ID"
                    />
                    <Link
                        to={`/game/${this.state.joinId}`}
                        className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition block w-full"
                    >
                        Join Game
                    </Link>
                </div>
            </div>
        );
    }
}

export default PlayWithFriendPage;
