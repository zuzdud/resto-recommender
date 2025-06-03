import React from "react";
import './Footer.css'

function Footer(){
    return (
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
    )
}

export default Footer