import Link from 'next/link'
import Container from '../components/Container'
import styles from '../styles/Dashboard.module.css'
import { SSO_GOOGLE_URL } from '../../../utils/url';

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
                <p>or</p>
                <Link href={`${SSO_GOOGLE_URL}/connect/google`}>
                    <div className={styles.google_btn}>
                        <div className={styles.google_icon_wrapper}>
                            <img className={styles.google_icon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
                        </div>
                        <p className={styles.btn_text}><b>Sign in with google</b></p>
                    </div>
                </Link>
            </div>
        </Container>
    )
}
