
import '../CSS/Homepage.css'
import {Link} from "react-router-dom";
import React from "react";
import Navbar from "./Components/Navbar/Navbar.jsx";
/*import styles from "../CSS/home.module.css";*/
import Searchbar from "./Components/Navigation/SearchBar/Searchbar.jsx";


function homepage() {

    return (
        <div className="main justify-content-center align-items-center">
            {/* Navbar */}
            <Navbar/>
            <div className="d-flex justify-content-center my-4"><Searchbar/></div>
            <div className="d-flex justify-content-center align-items-center pattern-wrapper logo-container my-5">
                <div className="pattern"/>

                <div className="d-flex flex-column flex-md-row align-items-center justify-content-center">
                    <div className="logo"></div>
                    <div className="logo d-none d-md-block"></div>
                </div>

                <div className="pattern"/>
            </div>
            {/*            <div className="container-fluid">
                <div className="left"></div>

                 Big logo
                <div className="logo">

                </div>

                 Right bar
                <div className="right"></div>
            </div>*/}
            {/* Footer */}
            <div className="footer px-auto">

                {/*<div className="row p-0 align-items-center  text-center">
                    <div className="col mx-auto">
                        One of three columns
                        <h3>What's for dinner</h3>

                        Your new favorite restaurants at your fingertips
                    </div>
                    <div className="col mx-auto">
                        One of three columns

                            <h4>Links</h4>
                            <ul>
                                <li><a href="#">Homepage</a></li>
                                <li><a href="#">Map</a></li>
                                <li><a href="#">About us</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>

                    </div>
                    <div className="col mx-auto">
                        One of three columns

                            <h4>Contact</h4>
                            <p>Email: info@whatsfordinner.com</p>
                            <p>Tel: +48 123 456 789</p>

                    </div>

                </div>*/}
                <div className="row p-0 align-items-start text-center">
                    <div className="col mx-auto mb-3"></div>
                    <div className="col-12 col-md mx-auto mb-3">
                        <h3>What's for dinner</h3>
                        <p>Your new favorite restaurants at your fingertips</p>
                    </div>
                    <div className="col-12 col-md mx-auto mb-3">
                        <h4>Links</h4>
                        <ul className="list-unstyled">
                            <li><a className="text-white text-decoration-none" href="#">Homepage</a></li>
                            <li><a className="text-white text-decoration-none" href="#">Map</a></li>
                            <li><a className="text-white text-decoration-none" href="#">About us</a></li>
                            <li><a className="text-white text-decoration-none" href="#">Contact</a></li>
                        </ul>
                    </div>
                    <div className="col-12 col-md mx-auto mb-3">
                        <h4>Contact</h4>
                        <p>Email: info@whatsfordinner.com</p>
                        <p>Tel: +48 123 456 789</p>
                    </div>
                    <div className="col mx-auto mb-3"></div>
                </div>

                <div className="text-center mt-3 border-top pt-3">
                    <p className="mb-0">&copy; {new Date().getFullYear()} What's for dinner. All rights reserved.</p>
                </div>

                {/* Tutaj zawartość stopki */}
            </div>
        </div>
    );
}

export default homepage;
