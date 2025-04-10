import React from 'react';
import './Sidebar.module.css';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <img src="avatar.png" alt={"👤"} className="avatar"/>
            <button className="side-btn">register</button>
            <button className="side-btn">login</button>
            <button className="side-btn">map</button>
        </div>
    );
}
