import React from 'react';
import { useState, useEffect } from 'react';
import styles from '../CSS/home.module.css'
import '../index.css'
import Searchbar from "./Components/Navigation/SearchBar/Searchbar.jsx";

export default function Home() {
    const [darkMode, setDarkMode] = useState(false);

    // Efekt uruchamiany przy zmianie trybu
    useEffect(() => {
        // Dodaj lub usuń klasę dark-mode z elementu body
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        // Opcjonalnie: zapisz preferencję użytkownika w localStorage
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    // Załaduj preferencję użytkownika przy starcie
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            setDarkMode(savedMode === 'true');
        }
    }, []);

    // Funkcja do przełączania trybu
    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    return (
        // Dodajemy klasę darkContainer warunkowo gdy darkMode jest true
        <div className={`${styles.container} ${darkMode ? styles.darkContainer : ''}`}>
            <div className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerSection}>
                        <h3>What's for dinner</h3>
                        <p>Your new favorite restaurants at your fingertips</p>
                    </div>

                    <div className={styles.footerSection}>
                        <h4>Links</h4>
                        <ul>
                            <li><a href="#">Homepage</a></li>
                            <li><a href="#">Map</a></li>
                            <li><a href="#">About us</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>

                    <div className={styles.footerSection}>
                        <h4>Contact</h4>
                        <p>Email: info@whatsfordinner.com</p>
                        <p>Tel: +48 123 456 789</p>
                    </div>
                </div>

                <div className={styles.footerBottom}>
                    <p>&copy; {new Date().getFullYear()} What's for dinner. All rights reserved.</p>
                </div>
            </div>
            <div className={styles.navigation}>
                <div className={styles.minilogo}>
                    <h4>What's for dinner</h4>
                </div>
                <div className={styles["menu-bttn"]}>
                    <ul>
                        <li>
                            <button>Discover</button>
                        </li>
                        <li>
                            <button>Menu</button>
                        </li>
                        <li>
                            <button>Contact</button>
                        </li>
                        <li>
                            <button>About</button>
                        </li>
                    </ul>
                </div>
                <div className={styles["login-bttn"]}>
                    <ul>
                        <li>
                            <label className={styles.switch}>
                                <input type="checkbox"
                                       checked={darkMode}
                                       onChange={toggleDarkMode}
                                />
                                <span className={`${styles.slider} ${styles.round}`}></span>
                            </label>
                        </li>
                        <li>
                            <button>Login</button>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.logo}>
                <Searchbar/>
            </div>
            <div className={styles.right}></div>
            <div className={styles.left}></div>
        </div>
    );
}