import React, {useEffect, useState} from "react";
import "./Signpage.module.css"
import styles from "../../Home/home.module.css";
/*

npm install react-router-dom
npm install react-bootstrap bootstrap

*/

export function Signpage() {

    const [activeTab, setActiveTab] = useState("login");

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        console.log(tab);
    };

    const handleLoginSubmit = () => {

        console.log("Clicked login");
        // obsługa logowania
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        // obsługa rejestracji
    };
    const [darkMode, setDarkMode] = useState(false);

    // Efekt uruchamiany przy zmianie trybu
    useEffect(() => {
        // Dodaj lub usuń klasę dark-mode z elementu body
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }

        // Opcjonalnie: zapisz preferencję użytkownika w localStorage
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    // Załaduj preferencję użytkownika przy starcie
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            setDarkMode(savedMode === 'true');
        }
    }, []);

    // Funkcja do przełączania trybu
    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };


    return (
        <div className="sign-in-form">
            <div className={styles.navigation}>
                <div className={styles.minilogo}>
                    <h4>What's for dinner</h4>
                </div>
                <div className={styles["menu-bttn"]}>
                    <ul>
                        <li>
                            <button>Discover</button>
                        </li>
                        <li>
                            <button>Menu</button>
                        </li>
                        <li>
                            <button>Contact</button>
                        </li>
                        <li>
                            <button>About</button>
                        </li>
                    </ul>
                </div>
                <div className={styles["login-bttn"]}>
                    <ul>
                        <li>
                            <label className={styles.switch}>
                                <input type="checkbox"
                                       checked={darkMode}
                                       onChange={toggleDarkMode}
                                />
                                <span className={`${styles.slider} ${styles.round}`}></span>
                            </label>
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles['sign-form']}>
                <div className="screen border-bottom"></div>
                <div className="container mt-3 mb-3" id="m-cont">
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                                id="pills-login-tab"
                                onClick={() => handleTabClick('login')}
                                type="button"
                                role="tab"
                            >
                                LOGIN
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                                id="pills-register-tab"
                                onClick={() => handleTabClick('register')}
                                type="button"
                                role="tab"
                            >
                                REGISTER
                            </button>
                        </li>
                    </ul>
                </div>

                <div className="tab-content mb-4 mx-auto" id="pills-tabContent">
                    {activeTab === 'login' ? (
                        <LoginForm onSubmit={handleLoginSubmit}/>
                    ) : (
                        <RegisterForm onSubmit={handleRegisterSubmit}/>
                    )}
                </div>
                <div className="border-top"></div>
            </div>


            <div className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerSection}>
                        <h3>What's for dinner</h3>
                        <p>Your new favorite restaurants at your fingertips</p>
                    </div>

                    <div className={styles.footerSection}>
                        <h4>Links</h4>
                        <ul>
                            <li><a href="http://localhost:5173/home">Homepage</a></li>
                            <li><a href="#">Map</a></li>
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
        </div>
    );
}

function LoginForm() {


    function handleRegisterSubmit() {

    }

    return (
        <div className="tab-pane fade show active" id="pills-login" role="tabpanel">
            <form onSubmit={handleRegisterSubmit} noValidate>
                <div className="mb-3">
                    <label htmlFor="username-login" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username-login"
                        name="name"
                        required
                    />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Please fill out this field.</div>
                </div>

                <div className="mb-3">
                    <label htmlFor="password-login" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password-login"
                        name="password"
                        required
                    />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Please fill out this field.</div>
                </div>

                <button type="submit" className="btn btn-primary" id="but1">Login</button>
            </form>
        </div>

    )
}

function RegisterForm() {


    function handleRegisterSubmit() {

        console.log("Clicked login");
    }

    return(
        <div className="tab-pane fade show active" id="pills-login" role="tabpanel">
            <form onSubmit={handleRegisterSubmit} noValidate>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="mail-register"
                        name="email"
                        required
                    />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Please fill out this field.</div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username-register"
                        name="name"
                        required
                    />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">Please fill out this field.</div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password-register"
                        name="password"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Repeat password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password-rep"
                        name="password-rep"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary" id="but2">Register</button>
            </form>
        </div>
    )
}
