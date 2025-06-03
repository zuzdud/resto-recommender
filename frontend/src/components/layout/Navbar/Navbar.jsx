import React , {useEffect, useState} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ważne! Import Bootstrapa
import './Navbar.css'

export default function Navbar() {
/*    const isLoggedIn = !!localStorage.getItem("accessToken");
    const username = localStorage.getItem("username");*/
    const navigate = useNavigate();

    const isLoggenIn = false;
    const username = "Isztwan";

    const logout = () => {
        localStorage.clear();
        navigate("/");
    };

    return (

        /*
                <nav className="navbar navbar-light navbar-expand-lg fixed-top my-4 mx-auto">
        */
        <nav className="navbar navbar-light navbar-expand-lg py-5 mx-auto">

            <div className="container-fluid">
                <Link className="navbar-name ms-3 justify-content-center align-items-center" to="/">What's for
                    dinner</Link>

                <button className="navbar-toggler me-2" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                        <li className="nav-item mx-4 px-1 else rounded-5">
                            <Link className="nav-link active" to="/discover">Discover</Link>
                        </li>
                        <li className="nav-item mx-4 px-1 else rounded-5">
                            <Link className="nav-link active" to="/contact">Contact</Link>
                        </li>
                        <li className="nav-item mx-4 px-1 else rounded-5">
                            <Link className="nav-link active" to="/about">About</Link>
                        </li>
{/*
                        <li className="nav-item">
                             Możesz tutaj dać warunek login/logout, np.
                             {isLoggedIn ? <Link ...>Logout</Link> : <Link ...>Login</Link>}
                        </li>*/}
                    </ul>

                    {/* Login/Logout */}
                    <ul className="navbar-nav  mb-2 mb-lg-0 me-5">
                        <li className="nav-item ">
{/*                            <Link className="nav-link active btn rounded-4" to="/sign">
                                <button type="button" className="btn btn-dark rounded-4">
                                    Sign in
                                </button>
                                Sign in
                            </Link>*/}
                            {isLoggenIn?(
                                <div className="dropdown rounded-5">
                                    <button className="btn btn-dark dropdown-toggle  rounded-5" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {username}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Link className="dropdown-item" to="/profile">Profil</Link></li>
                                        <li>
                                            <button className="dropdown-item" onClick={logout}>Wyloguj się
                                            </button>
                                        </li>

                                    </ul>
                                </div>

                            ): (
                                <button type="button" className="btn btn-dark rounded-4 sign-bttn" onClick={() => navigate("/login")}>Sign in</button>
                            )}


                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    );
}

