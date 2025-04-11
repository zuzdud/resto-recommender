import styles from './Navigation.module.css';
import Searchbar from "./SearchBar/Searchbar.jsx";

function Navigation() {
    return (
        <div className={styles.topnav} >
            <ul className={styles.navigation}>
                <li><Searchbar/></li>
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Contact</li>
            </ul>

        </div>
    )
}

export default Navigation;
