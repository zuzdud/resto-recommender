import styles from '../../../CSS/Footer.module.css'

function Footer(){
    return(
        <footer className={styles.foot}>
            <p>&copy;{new Date().getFullYear()} Whats For Dinner</p>
        </footer>
    );
}

export default Footer;