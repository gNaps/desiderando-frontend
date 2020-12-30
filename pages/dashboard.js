import Link from 'next/link'
import Container from '../components/Container'
import styles from '../styles/Dashboard.module.css'

export default function dashboard () {

    return (
        <Container>
            <div className={styles.logo}>
                <img className={styles.logo_img} src={'/logo-desiderando-black.png'} />
                <p>No more unwanted gift.</p>
                <img src={'/login-splash.svg'} />
            </div>
            
            <div className={styles.btn_container}>
                <Link href={'/login'}>
                    <a>
                        <button 
                        className={styles.btn_login}>
                            <p>Log In</p>
                        </button>
                    </a>
                </Link>
                <Link href={'/signin'}>
                    <a>
                        <button 
                        className={styles.btn_signin}>
                            <p>Sign In</p>
                        </button>
                    </a>
                </Link>
            </div>
        </Container>
    )
}
