import Container from '../../components/Container'
import styles from '../../styles/Login.module.css'
import dashstyles from '../../styles/Dashboard.module.css'
import AlertSuccess from '../../components/AlertSuccess'
import AlertError from '../../components/AlertError'

import { API_URL } from '../../utils/url';
import { detectBrowser, detectOS } from '../../utils/tools';

import { useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link'

const ChangePassword = () => {
    const r = useRouter();
    const { token } = r.query;

    //console.log("token", token);

    const [loading, setLoading] = useState(true);
    const [tokenExpired, setTokenExpired] = useState(false);
    const [showSuccessAlert, setSuccessAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showErrorAlert, setErrorAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const checkToken = async () => {
        console.log('verifico')
        const request = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const response_res = await fetch(`${API_URL}/tokenusers/${token}`, request)
        const response = await response_res.json()
        
        if(response.statusCode) {
            setLoading(false);
            setTokenExpired(true);
        } else {
            setLoading(false);
            setTokenExpired(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(newPassword);

        if(newPassword !== confirmPassword) {
            setErrorAlert(true);
            setMessage("The two passwords not matching");

            setTimeout(() => {
                setErrorAlert(false);
                setMessage("");
                setNewPassword ("");
                setConfirmPassword ("");
            }, 1500)
        }

        const bodyRequest = { token: token, newPassword: newPassword, confirmPassword: confirmPassword };
        const request = {
            method: 'POST',
            body: JSON.stringify(bodyRequest),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const response_res = await fetch(`${API_URL}/tokenusers/updatePasswordByToken`, request);
        const response = await response_res.json();
                
        if(response.statusCode) {
            setErrorAlert(true);
            setMessage(response.message);

            setTimeout(() => {
                setErrorAlert(false);
                setMessage("");
                setNewPassword ("");
                setConfirmPassword ("");
            }, 1500)
        } else {
            setSuccessAlert(true)
            setSuccessMessage("Your password has been updated succesfully.")

            setTimeout(() => {
                setSuccessAlert(false)
                setSuccessMessage("");
                r.replace('/dashboard');
            }, 1500)
        }
    }

    if(token && loading) {
        checkToken();
    }

    return (
        <Container>
            <div className={dashstyles.logo}>
                <Link href="/dashboard">
                    <img className={dashstyles.logo_img} src={'/logo-desiderando-black.png'} />
                </Link>
                <p>No more unwanted gift.</p>
            </div>

            { loading &&
                <p>
                    We'are checking this link...
                </p>
            }

            { !loading && !tokenExpired &&
                <form onSubmit={handleSubmit} className={styles.login_form}>
                    <div>
                        <p>Seems you forget your password. Don’t worry, happens to the best of us.</p>
                        <p>Digit your new password</p>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => { setNewPassword(e.target.value) }} />
                        <p>Please redigit your new password, for safety </p>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => { setConfirmPassword(e.target.value) }} />
                        
                        <p>In order to protect your account make sure your password:</p>

                        <ul>
                            <li>Is longer than 7 charachters</li>
                            <li>Does not match or significantly contain your username, e.g. do not user 'username123'</li>
                            <li>Does not contain your personal information</li>
                            <li>Does contain uppercase letters, numbers and special characters like !, $ ecc.</li>
                        </ul>
                    </div>

                    <div className={dashstyles.btn_container}>
                        <button type="submit" className={dashstyles.btn_login}>
                            Reset password
                        </button>
                    </div>
                    
                </form>
            }

            { !loading && tokenExpired &&
                <p>
                    Seems this links is expired. Please request a new reset of your password.
                </p>
            }

            {
                showSuccessAlert && 
                <AlertSuccess message={successMessage} />
            }

            {
                showErrorAlert && 
                <AlertError message={message} />
            }

        </Container>
    )
}

export default ChangePassword;