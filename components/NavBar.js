import Link from 'next/link'
import Router from 'next/router';
import { useState } from 'react'
import cookie from 'js-cookie';

import styles from '../styles/NavBar.module.css';

export default function NavBar() {

    const [toggleMenu, setToggleMenu] = useState(false)

    const logout = () => {
        cookie.remove('jwt')
        Router.push('/dashboard')
    }

    return (
        <>
        <div className={styles.nav}>
            <Link href="/">
                <a>
                <img src="/logo-desiderando-white.png"  style={{width: '100px'}}/>
                </a>
            </Link>
            <div className={styles.hamburger} onClick={() => setToggleMenu(!toggleMenu)}>
                { !toggleMenu && <img src="/ham.svg" style={{width: '45px'}}/> }
                { toggleMenu && <i class="fas fa-times" style={{marginRight: '30px', color: '#F5F5F2'}}/> }
            </div>
        </div>
        { toggleMenu &&
            <div className={styles.sub_nav}>
                <li onClick={() => logout()}>
                    <i class="fas fa-sign-out-alt" />
                    <p>Logut</p>
                </li>
            </div>
        }
        </>
    )
}