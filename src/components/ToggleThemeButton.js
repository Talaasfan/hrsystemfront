import React from 'react';
import './ToggleThemeButton.css';

const ToggleThemeButton = ({ isDarkMode, toggleTheme }) => {
    return (
        <button className="toggle-theme-btn" onClick={toggleTheme}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
    );
};

export default ToggleThemeButton;
