import { useState} from "react";
import styles from './Button.module.css';

const Button = (props) => {
    const [ state, setState ] = useState(1);
    const handler = () => {
        setState(prev => prev + 1);
    };
    return (
        <button
            className={styles.clicker}
            onClick={handler}
        >
            {props.text} {state}
        </button>
    );
}

export default Button;