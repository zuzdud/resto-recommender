import React from 'react';
import styles from '../CSS/home.module.css'
import '../index.css'
import Searchbar from "./Components/Navigation/SearchBar/Searchbar.jsx";

export default function Home() {
    return (
        <div className={styles.container}>
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
                                <input type="checkbox"/>
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
