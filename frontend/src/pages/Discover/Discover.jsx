import styles from "../CSS/Discover.module.css"

import React from "react";
import Footer from "./Components/Footer/Footer.jsx";
import Navigation from "./Components/Navigation/Navigation.jsx";

export default function Discover() {
    return (
        <div className={styles.container}>
            <div className={styles.Navigation}>
                <Navigation/>
            </div>
            <div className={styles.Area}> Area</div>
            <div className={styles.Footer}>
                <Footer/>
            </div>
        </div>
    );
}