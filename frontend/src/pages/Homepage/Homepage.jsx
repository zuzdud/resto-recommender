
import './Homepage.css'
import {Link} from "react-router-dom";
import React from "react";
import Navbar from "../../Components/layout/Navbar/Navbar.jsx";
import Searchbar from "../../Components/common/Searchbar/Searchbar.jsx";
import Footer from "../../Components/ui/B-Footer/Footer.jsx";
import logo from "../../assets/logo5.jpg";

/*import styles from "../CSS/home.module.css";*/



function homepage() {


    const Checkerboard = () => {
        const rows = 21;
        const cols = 5;
        const squares = Array.from({ length: rows * cols }, (_, i) => {
            const isDark = (Math.floor(i / cols) + (i % cols)) % 2 === 0;
            return (
                <div
                    key={i}
                    className={`square ${isDark ? 'dark' : 'light'}`}
                />
            );
        });

        return <div className="checkerboard">{squares}</div>;
    };





    return (
        <div className="HomepageLayout">

            <Navbar/>



            <div className="page-layout d-flex my-4">
                <div className="pattern"></div>
                <div className="for-img">
                    <div className="img-placeholder mx-auto border">
                        <img src={logo} alt="Logo" className="logo-img"/>
                    </div>
                </div>
                <div className="pattern"></div>
            </div>

            <Footer/>
        </div>
    );
}

export default homepage;


