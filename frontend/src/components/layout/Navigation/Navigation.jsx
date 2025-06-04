import styles from './Navigation.module.css';
import {Link} from "react-router-dom";
import React from "react";


function Navigation() {

    return (
        <div className={styles.navigation}>
            <div className={styles.minilogo}>
                <Link to="/">
                    <h4>What's for dinner?</h4>
                </Link>
            </div>
            <div className={styles["menu-bttn"]}>
                <ul>
                    <li>
                        <a href="/discover">
                            <button type="button">Discover</button>
                        </a>
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
                            />
                            <span className={`${styles.slider} ${styles.round}`}></span>
                        </label>
                    </li>
                    <li>
                        <a href="/login">
                            <button type="button">Login</button>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navigation;
