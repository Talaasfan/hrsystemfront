import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className={isDarkMode ? 'dark-mode' : ''}>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
                    <Route path="/home" element={<Home isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
