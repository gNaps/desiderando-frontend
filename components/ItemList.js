import Link from 'next/link'
import styles from '../styles/ItemList.module.css';

export default function ItemList({desiderio, category}) {
    return (
        <Link href={`/desiderio/${desiderio.slug}`}>
            <a>
                <div className={styles.card}>
                    { category === 1 &&
                        <div className={styles.card_category}>
                            <img src={'/category-collection.svg'} />
                        </div>
                    }

                    { category === 2 &&
                        <div className={styles.card_category}>
                            <i class="fas fa-laptop fa-2x" />
                        </div>
                    }

                    { category === 3 &&
                        <div className={styles.card_category}>
                            <i class="fas fa-tshirt fa-2x" />
                        </div>
                    }

                    { category === 4 &&
                        <div className={styles.card_category}>
                            <i class="fas fa-book fa-2x" />
                        </div>
                    }

                    { category === 5 &&
                        <div className={styles.card_category}>
                            <i class="fas fa-plane fa-2x" />
                        </div>
                    }

                    { category === 6 &&
                        <div className={styles.card_category}>
                            <i class="fas fa-home fa-2x" />
                        </div>
                    }

                    { category === 7 &&
                        <div className={styles.card_category}>
                            <i class="far fa-gem fa-2x" />
                        </div>
                    }
                    <div className={styles.card_item}>
                        <p>{desiderio.name}</p>
                        <h4>{desiderio.price} &euro;</h4>
                    </div>
                </div>
            </a>
        </Link>
    )
}