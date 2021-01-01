import cookie from 'js-cookie';
import { useContext, useState } from 'react'
import { API_URL } from '../utils/url';
import Router from 'next/router';

import Container from '../components/Container'
import styles from '../styles/Login.module.css'
import dashstyles from '../styles/Dashboard.module.css'

import AuthContext from '../context/AuthContext'

export default function login () {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const { loginUser } = useContext(AuthContext)

    /**
     * on submit user login in
     * @param {event} e 
     */
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("chiamo strapi per login")

        const user = {identifier: username, password: password}

        await fetch(`${API_URL}/auth/local`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.statusCode === 400) {
                console.log('utente o password invalidi')
                setError(true)
            } else {
                if(data.jwt) {
                    cookie.set('jwt', data.jwt)
                    loginUser(data.user)
                    Router.push('/')
                } else {
                    console.log('utente o password invalidi')
                    setError(true)
                }
            }
        })
        .catch((error) => {
            console.error('Error:', error);
          });
    }

    return (
        <Container>
            <div className={dashstyles.logo}>
                <img className={dashstyles.logo_img} src={'/logo-desiderando-black.png'} />
                <p>No more unwanted gift.</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.login_form}>
                <div>
                    <p>Username or Email</p>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value); setError(false) }} />
                </div>
                <div>
                    <p>Password</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(false) }} />
                </div>

                <div className={dashstyles.btn_container}>
                    <button type="submit" className={dashstyles.btn_login}>
                        Log In
                    </button>
                </div>
                
            </form>

            { error && 
                <div className={styles.error}>
                    <p>User or password is invalid.</p>
                </div>
            }

        </Container>
    )
}