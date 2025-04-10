import styles from './Navigation.module.css';

function Navigation() {
    return (
        <div>
            <ul className={styles.navigation}>
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Contact</li>
            </ul>

        </div>
    )
}

export default Navigation;
