import Container from '../../components/Container'
import styles from '../../styles/Login.module.css'
import dashstyles from '../../styles/Dashboard.module.css'
import AlertSuccess from '../../components/AlertSuccess'

import { API_URL } from '../../utils/url';

import { useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'

const Recovery = () => {
    const r = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email);

        const bodyRequest = { email: email };
        const request = {
            method: 'POST',
            body: JSON.stringify(bodyRequest),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response_res = await fetch(`${API_URL}/invites/recoveryPassword`, request);
        const response = await response_res.json();
        
        if(response.statusCode) {
            console.log('ERRORE')
            console.log(response)
        } else {
            setSuccessAlert(true)
            setSuccessMessage("An email been sent. please click the link when you het it.")

            setTimeout(() => {
                setSuccessAlert(false)
                setSuccessMessage("");
                r.replace('/dashboard');
            }, 1500)
        }
    }

    const [email, setEmail] = useState('');
    const [showSuccessAlert, setSuccessAlert] = useState(false);
    const [showErrorAlert, setErrorAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    return (
        <Container>
            <div className={dashstyles.logo}>
                <Link href="/dashboard">
                    <img className={dashstyles.logo_img} src={'/logo-desiderando-black.png'} />
                </Link>
                <p>No more unwanted gift.</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.login_form}>
                <div>
                    <p>Seems you forget your password. Don’t worry, happens to the best of us.</p>
                    <p>Digit your Email</p>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }} />
                </div>

                <div className={dashstyles.btn_container}>
                    <button type="submit" className={dashstyles.btn_login}>
                        Send email 
                    </button>
                </div>
                
            </form>

            {
                showSuccessAlert && 
                <AlertSuccess message={successMessage} />
            }

        </Container>
    )
}

export default Recovery;