import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends Component {
    render() {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-black to-purple-900 text-white px-4">
                <div className="max-w-3xl w-full text-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-10 shadow-[0_0_60px_rgba(255,255,255,0.1)] animate-fade-in">
                    <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400 drop-shadow-lg">
                        Tic Tac Toe
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 mb-8">
                        The Ultimate Game of <span className="text-fuchsia-400 font-semibold">Strategy</span> and <span className="text-cyan-300 font-semibold">Fun</span>.<br />
                        Play against our smart AI or battle it out with your friends!
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-6 mt-6">
                        <Link to="/play-with-ai">
                            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl text-lg font-semibold shadow-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                                <span className="z-10 relative text-white">🤖 Play with AI</span>
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-500 opacity-20 blur-md"></div>
                            </button>
                        </Link>

                        <Link to="/play-with-friends">
                            <button className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-lg font-semibold shadow-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.6)]">
                                <span className="z-10 relative text-white">👫 Play with a Friend</span>
                                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 opacity-20 blur-md"></div>
                            </button>
                        </Link>
                    </div>

                    <div className="mt-10 text-sm text-gray-400">
                        Built with ❤️ by <span className="text-white font-semibold">Aman Chaudhary</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default LandingPage;
