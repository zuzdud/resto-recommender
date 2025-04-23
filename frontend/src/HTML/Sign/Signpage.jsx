import {useState} from "react";
import "../../CSS/sign.css"
import {RegisterForm} from "./Register.jsx";
import {LoginForm} from "./Login.jsx";
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


    return (

            <div className="sign-in-form">
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
                        <LoginForm/>
                    ) : (
                        <RegisterForm/>
                    )}
                </div>

                <div className="border-top"></div>
            </div>

    );
}




