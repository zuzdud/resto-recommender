import React from 'react';
import styles from './home.module.css'
import '../../styles/index.css'
import Searchbar from "../../components/common/Searchbar/Searchbar.jsx";
import Navigation from '../../components/layout/Navigation/Navigation.jsx'; // dodaj ten import
import logo from '../../assets/logo5.jpg';
import {Link} from "react-router-dom";

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
                            <li><a href="/home">Homepage</a></li>
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

            <Navigation />

            <div className={styles.logo}>
                <img className={styles["logo-picture"]} src={logo} />
            </div>
            <div className={styles.right}></div>
            <div className={styles.left}></div>
        </div>
    );
}