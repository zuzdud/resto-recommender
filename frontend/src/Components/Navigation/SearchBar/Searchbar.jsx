import styles from './Searchbar.module.css';

function Searchbar(){
    return (
        <input className={styles.bar} type="text" placeholder="Search.."/>
    );
}

export default Searchbar;