import styles from './Navigation.module.css';
import Searchbar from "./SearchBar/Searchbar.jsx";
import {useState} from "react";

function Navigation() {
    const [toggled, setToggled] = useState(false);

    return (
        <div className={styles.topnav} >
            <ul className={styles.navigation}>
                <li><Searchbar/></li>
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Contact</li>
                <li>
                    <button
                        className={`${styles['toggle-btn']} ${toggled ? styles['toggled'] : ''}`}
                        onClick={() => setToggled(!toggled)}
                    >
                        <div className={"thumb"}></div>
                    </button>
                </li>
            </ul>

        </div>
    )
}

export default Navigation;
