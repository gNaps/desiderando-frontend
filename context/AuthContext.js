import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import cookie from 'js-cookie';
import { API_URL } from '../utils/url';

const AuthContext = createContext()

export const AuthProvider = (props) => {

    const [user, setUser] = useState(null)
    const router = useRouter()
    
    /**
     * Adds user to context
     * @param {any} user 
     */
    const loginUser = async (user) => {
        setUser(user)
    }

    /**
     * Sets the user to null
     */
    const logoutUser = async () => {
        setUser(null)
    }

    /**
     * Given a token get the current user loggedin
     * @param {string} jwt 
     */
    const checkUserLoggedIn = async (jwt) => {

        try {
            await fetch(`${API_URL}/users/me`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`, 
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log('user risulta ', data)
                loginUser(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

            console.log('risultato: ', isLoggedIn)
        } catch (err) {

        }
    }

    /**
     * When reload if exist an jwt in cookies, retrivies the user for the context
     */
    const jwt = cookie.get('jwt')
    const r = useRouter()

    useEffect(() => {
        if(!jwt) {
            if(r.asPath.startsWith('/auth/changePassword') == false) {
                r.push('/dashboard');
            }
        } else {
            console.log('jwt esiste e user = ', user)
            if(user == null){
                console.log('quindi vado a sceglierlo')
                checkUserLoggedIn(jwt)
            }
        }
     }, [])

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext