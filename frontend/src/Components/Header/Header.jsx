import styles from './Header.module.css';

function Header() {
    return (
        <header className={styles.header}>
            <h1>What's For Dinner</h1>
            <nav className={styles.navbar}>
                <ul>
                    <li><a href="">Home</a></li>
                    <li><a href="">About</a></li>
                    <li><a href="">Services</a></li>
                    <li><a href="">Contact</a></li>
                </ul>
            </nav>
            <hr />
        </header>
    );
}

export default Header;


/*
import './Header.module.css'

function Header() {
    return (
        <header className="header">
            <div className="logo-pill"></div>
            <nav className="nav-links">
                <a>HOME</a>
                <a>ABOUT</a>
                <a>CONTACT</a>
            </nav>
        </header>
    );
}
export default Header;
*/