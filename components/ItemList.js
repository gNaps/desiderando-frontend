import Link from 'next/link'
import styles from '../styles/ItemList.module.css';

export default function ItemList({desiderio}) {
    return (
        <Link href={`/desiderio/${desiderio.slug}`}>
            <a>
                <div className={styles.card}>
                    <div className={styles.card_category}>
                        <img src={'/category-collection.svg'} />
                    </div>
                    <div className={styles.card_item}>
                        <p>{desiderio.name}</p>
                        <h4>{desiderio.price} &euro;</h4>
                    </div>
                </div>
            </a>
        </Link>
    )
}