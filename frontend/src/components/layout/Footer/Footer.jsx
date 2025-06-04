import styles from './Footer.module.css'
import React from "react";

function Footer(){
    return (
        <div className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerSection}>
                    <h3>What's for dinner</h3>
                    <p>Your new favorite restaurants at your fingertips</p>
                </div>

                <div className={styles.footerSection}>
                    <h4>Links</h4>
                    <ul>
                        <li><a href="/home">Homepage</a></li>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>

                <div className={styles.footerSection}>
                    <h4>Contact</h4>
                    <p>Email: info@whatsfordinner.com</p>
                    <p>Tel: +48 123 456 789</p>
                </div>
            </div>

            <div className={styles.footerBottom}>
                <p>&copy; {new Date().getFullYear()} What's for dinner. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer;