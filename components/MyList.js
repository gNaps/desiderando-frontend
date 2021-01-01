import Link from 'next/link'
import styles from '../styles/MyList.module.css';

export default function MyList({name, giftsLeft, listPublic}) {
    return (
        <div className={styles.card}>
            <h4>{name}</h4>
            <div className={styles.card_p}>
                <img src={'/gift.svg'} />
                <p>{giftsLeft} gifts left</p>
            </div>
            <div className={styles.card_p}>
                { !listPublic &&
                    <>
                    <img src={'/lock.svg'} />
                    <p>private</p>
                    </>
                } 
                { listPublic &&
                    <>
                    <img src={'/unlock.svg'} />
                    <p>public</p>
                    </>
                } 
            </div>
        </div>
    )
}