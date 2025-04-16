import styles from '../../../CSS/Components/Footer.module.css'

function Footer(){
    return(
        <footer className={styles.foot}>
            <p>&copy;{new Date().getFullYear()} Whats For Dinner</p>
        </footer>
    );
}

export default Footer;