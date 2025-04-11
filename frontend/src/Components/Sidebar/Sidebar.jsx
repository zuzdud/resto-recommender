import React from 'react';
import styles from './Sidebar.module.css';
import picture from '../../assets/images.jpg'

export default function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <ul>
                <img src={picture}/>
                <button>register</button>
                <button>login</button>
                <button>map</button>
            </ul>
        </div>
    );
}
