import Link from 'next/link'
import styles from '../styles/MyList.module.css';

export default function MyList() {
    return (
        <div className={styles.card}>
            <h4>Titolo lista</h4>
            <div className={styles.card_p}>
                <img src={'/gift.svg'} />
                <p>gifts left</p>
            </div>
            <div className={styles.card_p}>
                <img src={'/lock.svg'} />
                <p>private</p>
            </div>
        </div>
    )
}