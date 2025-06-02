import styles from "./Discover.module.css"
import Footer from "../../components/layout/Footer/Footer.jsx";
import Navigation from "../../components/layout/Navigation/Navigation.jsx";
import RestaurantPanel from "./Restaurant/RestaurantPanel.jsx";

import React from "react";
import Searchbar from "../../components/common/Searchbar/Searchbar.jsx";

export default function Discover() {
    return (
        <div className={styles.container}>
            <div className={styles.Navigation}>
                <Navigation/>
            </div>
            <div className={styles.Area}>
                <Searchbar/>
                <RestaurantPanel/>
            </div>
            <div className={styles.Footer}>
                <Footer/>
            </div>
        </div>
    );
}