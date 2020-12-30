import cookie from 'js-cookie';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'

import Container from '../components/Container'
import NavBar from '../components/NavBar'
import MyList from '../components/MyList'
import InvitedList from '../components/InvitedList'
import ButtonAction from '../components/ButtonAction'


export default function Home() {

  const jwt = cookie.get('jwt')
  const r = useRouter()

  React.useEffect(() => {
    if(!jwt) {
      r.push('/dashboard');
    }
  }, []);

  const handleClick = () => {
    console.log('clicked')
  }

  return (
    <Container>
      <NavBar />
      <h3>My lists</h3>
      <Link href={`/list/wishlist-of-napsryu`}>
        <a>
          <MyList />
        </a>
      </Link>
      <h3>Invites</h3>
      <InvitedList />
      <div class='footer_action'>
        <ButtonAction label={'New list'} action={handleClick} />
      </div>
    </Container>
  )
}
