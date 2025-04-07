import React from 'react';

const GameResult = ({ winner, gameDrawn, playerSymbol }) => {
    return (
        <>
        {(winner || gameDrawn) && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-gradient-to-br from-purple-700 to-indigo-800 text-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-fadeIn">
                    {gameDrawn ? (
                        <p className="text-yellow-300 text-2xl font-bold mb-4">It's a Draw! 🤝</p>
                    ) : winner === playerSymbol ? (
                        <p className="text-green-400 text-2xl font-bold mb-4">You Won! 🎉</p>
                    ) : (
                        <p className="text-red-400 text-2xl font-bold mb-4">You Lost! 😢</p>
                    )}

                    <div className="flex flex-col gap-4 mt-6">
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl shadow-lg transition text-lg"
                        >
                            Play Again
                        </button>
                        <button
                            onClick={() => this.props.router.navigate('/')}
                            className="bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-xl shadow-lg transition text-lg"
                        >
                            Go Back to Home
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    );
};

export default GameResult;
