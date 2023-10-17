import React from 'react'
const GameResult = ({ winner, onRestart }) => {
    return (
        <div className="result">
            {winner ? (
                <p className="text-4xl text-white">Winner: {winner}</p>
            ) : (
                <p className="text-4xl text-white">{winner === null ? "It's a draw!" : ""}</p>
            )}
            <button className="mt-4 px-4 py-2 bg-blue-700 text-white font-bold rounded-md transition duration-300 hover:bg-blue-800"onClick={onRestart}>Restart</button>
        </div>
    )
}
export default GameResult
