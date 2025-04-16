import picture from '../../../assets/images.jpg'
import styles from './Card.module.css'

function Card(){

    return(
        <div className={styles.card}>
            <img className="card-picture" src={picture} alt={"picture not found!"}></img>
            <h2 className={"card-title"} >Karolina</h2>
            <p>I make frontend!</p>

        </div>
    );
}
export default Card;