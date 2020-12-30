import Link from 'next/link'
import styles from '../styles/InvitedList.module.css';

export default function InvitedList() {
    return (
        <div className={styles.card}>
            <h4>Titolo lista</h4>
            <div className={styles.card_p}>
                <img src={'/gift.svg'} />
                <p>gifts left</p>
            </div>
            <div className={styles.card_p}>
                <img src={'/unlock.svg'} />
                <p>public</p>
            </div>
        </div>
    )
}