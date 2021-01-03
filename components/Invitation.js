import { useState } from 'react';

import styles from '../styles/Invitation.module.css'
import loginstyles from '../styles/Login.module.css'

export default function Invitation({id, handleClick}) {
    const [username, setUsername] = useState('')

    return (
        <div className={styles.modal}>
            <div className={styles.modal_content}>
                <div className={styles.modal_body}>
                <div className={loginstyles.login_form}>
                    <h5>Type username to invite</h5>
                    <p className={loginstyles.p_description}>Becarrefully to type correct the username, also with capitalcase and lowercase corrects.</p>
                    <input
                        type="text"
                        value={username}
                        name='username'
                        onChange={() => { setUsername(event.target.value) }} />
                </div>
                <button onClick={() => handleClick(username)}>
                    Invitation
                </button>
                </div>
            </div>
        </div>
    )
}