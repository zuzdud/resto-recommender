import styles from './Homepage.module.css'
import Button from "../Buttons/Button.jsx";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Navigation from "../Navigation/Navigation.jsx";

function homepage() {
    return(
        <div className={styles.container}>

            <div className={styles.first}>
                <div className={styles.sidebar}><Sidebar/></div>
            </div>

            <div className={styles.navbar}> <Navigation/> </div>

            <div className={styles.second}>
                <div className={styles.content}> Content
                    <h1>
                        what's <br/>
                        <span className={styles.highlight}>for</span><br/>
                        dinner?
                    </h1>
                </div>

            </div>

            <div className={styles.footer}> Footer</div>

        </div>
    );
}

export default homepage;