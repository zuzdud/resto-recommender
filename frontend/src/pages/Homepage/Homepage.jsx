import styles from './Homepage.module.css'
import Sidebar from "../../Components/Sidebar/Sidebar.jsx";
import Navigation from "../../Components/Navigation/Navigation.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import {useState} from "react";

function homepage() {

    return(
        <div className={styles.container}>

            <div className={styles.first}>
                <div className={styles.sidebar}><Sidebar/></div>
                <div className={styles.checkeredPattern}></div>
            </div>

            <div className={styles.navbar}><Navigation/> </div>

            <div className={styles.second}>
                <div className={styles.content}>
                    <div className={styles.pages}>
                        <h1>
                            What's <br/>
                            <span className={styles.highlight}> for</span><br/>
                            Dinner?
                        </h1>
                    </div>
                    <div className={styles.checkeredPattern}></div>
                    <div className={styles.pages}>
                        <h1>
                            What do you want to eat?
                        </h1>
                    </div>
                    <div className={styles.checkeredPattern}></div>

                </div>

            </div>

            <div><Footer/></div>

        </div>
    );
}

export default homepage;