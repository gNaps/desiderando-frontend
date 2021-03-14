import Container from '../../components/Container'
import NavBar from '../../components/NavBar'
import ButtonAction from '../../components/ButtonAction'
import styles from '../../styles/Desiderio.module.css'
import AlertSuccess from '../../components/AlertSuccess'
import AlertError from '../../components/AlertError'

import AuthContext from '../../context/AuthContext'

import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr'
import { useEffect, useState, useContext } from 'react';
import cookie from 'js-cookie';

import { API_URL } from '../../utils/url';


export default function Desiderio() {

    const r = useRouter();
    const { slug } = r.query;

    const fetcher = url => fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${cookie.get('jwt')}`, 
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
      
    const { data: desiderio, error } = useSWR(`${API_URL}/desiderioitems/?slug=${slug}`, fetcher)    

    const [showSuccessAlert, setSuccessAlert] = useState(false)
    const [showErrorAlert, setErrorAlert] = useState(false)
    const [message, setMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const handleClick = async () => {
        console.log('you have booked desiderio')

        await fetch(`${API_URL}/desiderioitems/book/${desiderio.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${cookie.get('jwt')}`, 
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.statusCode !== 400) {
                setSuccessAlert(true)
                mutate(`${API_URL}/desiderioitems/?slug=${slug}`)   

                setTimeout(() => {
                    setSuccessAlert(false)
                }, 1500)
            } else {
                console.log(data)
                setErrorAlert(true)
                setMessage(data.message)

                setTimeout(() => {
                    setErrorAlert(false)
                    setMessage('')
                }, 1500)
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const handleDeleteDesiderio = async () => {
        const request = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${cookie.get('jwt')}`, 
                'Content-Type': 'application/json'
            }
        };

        const response_res = await fetch(`${API_URL}/desiderioitems/${desiderio.id}`, request)
        const response = await response_res.json()
        
        if(response.statusCode) {
            setErrorAlert(true)
            setMessage(response.message)

            setTimeout(() => {
                setErrorAlert(false)
                setMessage('')
            }, 1500);
        } else {
            setSuccessAlert(true)
            setSuccessMessage("Your desiderio was deleted succesfully.")

            setTimeout(() => {
                setSuccessAlert(false)
                setSuccessMessage("");
            }, 1500)
            
            r.back();
        }
    }

    const { user } = useContext(AuthContext)

    return (
        <Container>
        <NavBar />

        {desiderio && desiderio.desideriolist.what_bought && desiderio.bought_by !== null &&
            user && desiderio.user == user.id &&
            <div className={styles.bought_by}>
                {desiderio.desideriolist.who_bought &&
                    <p>
                        This desiderio is booked by {desiderio.bought_by.email}
                    </p>
                } 
                {!desiderio.desideriolist.who_bought &&
                    <p>
                        This desiderio is booked by someone
                    </p>
                } 
            </div>
        }

        {desiderio && desiderio.bought_by !== null &&
            user && desiderio.user !== user.id &&
            <div className={styles.bought_by}>
                <p>
                    This desiderio is booked by {desiderio.bought_by.email}
                </p>
            </div>
        }

        {desiderio &&
            <>
            <h3>What is?</h3>
            <div className={styles.card_desiderio}>
                <h3>{desiderio.name}</h3>
                <p>{desiderio.description}</p>
            </div>

            <h3>How much?</h3>
            <div className={styles.card_desiderio}>
                <h3>{desiderio.price} &euro;</h3>
            </div>

            <h3>Where?</h3>
            <div className={styles.card_desiderio}>
                <a href={desiderio.place}>
                    <p>{desiderio.place}</p>
                </a>
            </div>
            </>
        }
        
        { user && desiderio && user.id !== desiderio.desideriolist.users && desiderio.bought_by === null &&
            <div className='footer_action'>
                <ButtonAction label={'Book desiderio'} action={handleClick} />
            </div>
        }

        { user && desiderio && user.id === desiderio.desideriolist.users &&
            <div className='footer_action'>
                <ButtonAction label={'Delete desiderio'} action={handleDeleteDesiderio} />
            </div>
        }

        {
            showSuccessAlert && 
            <AlertSuccess message={'Your booked was registry succesfully.'} />
        }

        {
            showErrorAlert && 
            <AlertError message={message} />
        }
        </Container>
    )
}
