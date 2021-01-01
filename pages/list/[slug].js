import Container from '../../components/Container'
import NavBar from '../../components/NavBar'
import ItemList from '../../components/ItemList'
import ButtonAction from '../../components/ButtonAction'

import AuthContext from '../../context/AuthContext'

import { useRouter } from 'next/router';
import useSWR from 'swr'
import { useEffect, useState, useContext } from 'react';
import cookie from 'js-cookie';

import { API_URL } from '../../utils/url';

export default function List() {

    const r = useRouter();
    const { slug } = r.query;

    console.log(slug);

    const fetcher = url => fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${cookie.get('jwt')}`, 
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
      
    const { data: list, error } = useSWR(`${API_URL}/desideriolists/?slug=${slug}`, fetcher)
    
    
    const handleClick = () => {
        console.log('clicked on desiderio')
    }

    const { user } = useContext(AuthContext)

    return (
        <Container>
        <NavBar />
        { list && 
            <>
            <h3>{list.name}</h3>

             {list.desiderioitems.map((desiderio) => (
                <ItemList desiderio={desiderio} key={desiderio.id}/>
            ))} 
            </>
        }
        
        { user && list && user.id === list.users &&
            <div className='footer_action'>
                <ButtonAction label={'New desiderio'} action={handleClick} />
            </div>
        }
        </Container>
    )
}