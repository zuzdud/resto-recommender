import styles from '../../../../CSS/Searchbar.module.css';

function Searchbar(){
    return (
        <div className={styles.searchContainer}>
            <input type="text" placeholder="Search.."/>
        </div>


    );
}

export default Searchbar;

//<input className={styles.bar} type="text" placeholder="Search.."/>