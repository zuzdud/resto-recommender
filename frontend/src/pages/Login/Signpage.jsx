import {useState} from "react";
import "./sign.css"
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

    return (
        <div>
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
                    <LoginForm onSubmit={handleLoginSubmit} />
                ) : (
                    <RegisterForm onSubmit={handleRegisterSubmit} />
                )}
            </div>

            <div className="border-top"></div>
        </div>
    );
}

function LoginForm(){


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
