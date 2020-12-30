import cookie from 'js-cookie';
import { useState } from 'react'
import { API_URL } from '../utils/url';
import Router from 'next/router';

import Container from '../components/Container'
import styles from '../styles/Login.module.css'
import dashstyles from '../styles/Dashboard.module.css'

export default function login () {
    
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {username: username, password: password, email: email}

        await fetch(`${API_URL}/auth/local/register`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.jwt) {
                cookie.set('jwt', data.jwt)
                Router.push('/')
            } else {

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
                    <p>Username</p>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value) } />
                </div>
                <div>
                    <p>Email</p>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value) } />
                </div>
                <div>
                    <p>Password</p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value) } />
                </div>

                <div className={dashstyles.btn_container}>
                    <button type="submit" className={dashstyles.btn_signin}>
                        Sign in
                    </button>
                </div>
            </form>
                

            { error &&
                <div className={styles.error}>
                    <p>Error! Please try again.</p>
                </div>
            }

        </Container>
    )
}