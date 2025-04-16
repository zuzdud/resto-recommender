import React, { useState, useEffect }  from 'react';
import styles from '../../../CSS/Sidebar.module.css';
import picture from '../../../assets/images.jpg'

export default function Sidebar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
//TODO
// make authorization token
    useEffect(() => {
        /*
        const userToken = localStorage.getItem('userToken');
        if (userToken) {
            setIsLoggedIn(true);
        }
        */
        setIsLoggedIn(true);
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
    }


    return (
        <div className={styles.sidebar}>
            <ul>
                <img src={picture} alt="Profile"/>

                {/* Przyciski dla niezalogowanych użytkowników */}
                {!isLoggedIn && (
                    <>
                        <button onClick={handleLogin} >login</button>
                    </>
                )}

                {/* Przycisk dla zalogowanych użytkowników */}
                {isLoggedIn && (
                    <>
                        <p>Profile</p>
                        <p>Location: Wrocław</p>
                        <button onClick={handleLogout}>logout</button>
                    </>
                )}

                {/* Przyciski dostępne dla wszystkich */}
                <button>map</button>
            </ul>
        </div>
    );
}
