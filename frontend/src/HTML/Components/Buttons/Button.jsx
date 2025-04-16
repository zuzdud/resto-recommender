import styles from '../../../CSS/Button.module.css';
import PropType from 'prop-types'

function Button(props){
    const handleClick = (e) => e.target.textContent = 'Ouch!';

    return(<button onDoubleClick=
                       {(e) => handleClick(e)} className={styles.btt}>{props.text}</button>);
}
export default Button;