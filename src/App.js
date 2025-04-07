import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import GameRoom from './components/GameRoom'
import PlayWithAI from './components/PlayWithAI';
import PlayWithFriends from './components/PlayWithFriends';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/play-with-ai" element={<PlayWithAI />} />
                <Route path="/play-with-friends" element={<PlayWithFriends />} />
                <Route path="/game/:gameId" element={<GameRoom />} />
            </Routes>
        </Router>
    );
}

export default App;

