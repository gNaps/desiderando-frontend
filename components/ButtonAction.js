import Link from 'next/link'
import styles from '../styles/ButtonAction.module.css';

export default function ButtonAction({label, action}) {
    return (
        <button 
            className={styles.button_action}
            onClick={() => action()}>
            <p>{label}</p>
        </button>
    )
}