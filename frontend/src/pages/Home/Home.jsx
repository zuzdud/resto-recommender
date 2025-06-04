import React from 'react';
import styles from './home.module.css'
import '../../styles/index.css'
import Searchbar from "../../components/common/Searchbar/Searchbar.jsx";
import Navigation from '../../components/layout/Navigation/Navigation.jsx';
import Footer from '../../components/layout/Footer/Footer.jsx'; // dodaj ten import
import logo from '../../assets/logo5.jpg';
import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div className={styles.container}>
            <Navigation />

            <div className={styles.logo}>
                {/*<img className={styles["logo-picture"]} src={logo} /> */}
            </div>
            <div className={styles.right}></div>
            <div className={styles.left}></div>

            <Footer /> {/* Footer na końcu */}
        </div>
    );
}