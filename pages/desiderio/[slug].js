import Container from '../../components/Container'
import NavBar from '../../components/NavBar'
import ButtonAction from '../../components/ButtonAction'
import styles from '../../styles/Desiderio.module.css'

import AuthContext from '../../context/AuthContext'

import { useRouter } from 'next/router';
import useSWR from 'swr'
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

    const handleClick = () => {
        console.log('you have booked desiderio')
    }

    const { user } = useContext(AuthContext)

    return (
        <Container>
        <NavBar />

        {desiderio && desiderio.desideriolist.what_bought && desiderio.bought_by !== null &&
            <div className={styles.bought_by}>
                {desiderio.desideriolist.who_bought &&
                    <p>
                        This desiderio is booked by {desiderio.bought_by}
                    </p>
                } 
                {!desiderio.desideriolist.who_bought &&
                    <p>
                        This desiderio is booked by someone
                    </p>
                } 
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
        
        {user && desiderio && user.id !== desiderio.desideriolist.users && desiderio.bought_by === null &&
            <div className='footer_action'>
                <ButtonAction label={'Book desiderio'} action={handleClick} />
            </div>
        }
        </Container>
    )
}
