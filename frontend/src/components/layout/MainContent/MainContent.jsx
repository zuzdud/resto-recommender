import React from 'react';
import './MainContent.module.css';

export default function MainContent() {
    return (
        <main className="main-content">
            <div className="background-block"></div>
            <h1 className="headline">
                what’s <br />
                <span className="highlighted-word">for</span> <br />

            </h1>
            <div className="footer-block"></div>
        </main>
    );
}