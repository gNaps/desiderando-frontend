import cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'
import useSWR from 'swr'

import Container from '../components/Container'
import NavBar from '../components/NavBar'
import MyList from '../components/MyList'
import InvitedList from '../components/InvitedList'
import ButtonAction from '../components/ButtonAction'

import { API_URL } from '../utils/url';


export default function Home() {

  const handleClick = () => {
    console.log('clicked')
  }

  const fetcher = url => fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${cookie.get('jwt')}`, 
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  
  const { data: listadesideri, error } = useSWR(`${API_URL}/desideriolists`, fetcher)

  const [mylist, setMyList] = useState([])
  const [invitedList, setInvitedList] = useState([])

  React.useEffect(() => {
    if(listadesideri) {
      setMyList(listadesideri.filter((element) => { return !element.invited}))
      setInvitedList(listadesideri.filter((element) => { return element.invited}))
    }
  }, [listadesideri]);
  

  return (
    <Container>
      <NavBar />

      <h3>My lists</h3>
      { mylist &&
        mylist.map((lista) => (
          <Link href={`/list/${lista.slug}`} key={lista.id}>
          <a>
            <MyList name={lista.name} listPublic={lista.public} giftsLeft={lista.gifts_left} />
          </a>
        </Link> 
        ))
      }

      <h3>Invites</h3>
      {
        invitedList &&
        invitedList.map((lista) => (
          <Link href={`/list/${lista.slug}`} key={lista.id}>
          <a>
          <InvitedList name={lista.name} listPublic={lista.public} giftsLeft={lista.gifts_left} />
          </a>
        </Link> 
        ))
      }

      <div className='footer_action'>
        <ButtonAction label={'New list'} action={handleClick} />
      </div>
    </Container>
  )
}
