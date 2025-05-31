// src/components/ThemeToggle.js
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const ThemeToggle = () => {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);

    return (
        <button onClick={toggleDarkMode} className="theme-toggle">
            {darkMode ? '☀️ Tryb jasny' : '🌙 Tryb ciemny'}
        </button>
    );
};

export default ThemeToggle;