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
import AlertSuccess from '../components/AlertSuccess'
import AlertError from '../components/AlertError'

import { API_URL } from '../utils/url';

import loginstyles from '../styles/Login.module.css'

export default function Home() {

  const handleClick = () => {
    console.log('clicked')
    setShowInsert(true)
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setNewLista(newLista => ({...newLista, [name]: value}))
  }

  const handlePublic = e => {
    const checked = e.target.checked
    setNewLista(newLista => ({...newLista, public: checked}))
  }

  const handleWhat = e => {
    const checked = e.target.checked
    setNewLista(newLista => ({...newLista, what_bought: checked}))
  }

  const handleWho = e => {
    const checked = e.target.checked
    setNewLista(newLista => ({...newLista, who_bought: checked}))
  }

  const handleSaveInsert = async () => {
    console.log('inserisco: ', newLista)

    await fetch(`${API_URL}/desideriolists`, {
        method: 'POST',
        body: JSON.stringify(newLista),
        headers: {
            'Authorization': `Bearer ${cookie.get('jwt')}`, 
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if(data.statusCode !== 400) {
            setSuccessAlert(true)
            setShowInsert(false)

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
            }, 1500);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
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
    if(listadesideri && listadesideri.length > 0) {
      setMyList(listadesideri.filter((element) => { return !element.invited}))
      setInvitedList(listadesideri.filter((element) => { return element.invited}))
    }
  }, [listadesideri]);

  const [showInsert, setShowInsert] = useState(false)
  const [newLista, setNewLista] = useState({name: '', public: false, required_password: false, what_bought: false, who_bought: false})

  const [showSuccessAlert, setSuccessAlert] = useState(false)
  const [showErrorAlert, setErrorAlert] = useState(false)
  const [message, setMessage] = useState('')

  return (
    <Container>
      <NavBar />

      {
        !showInsert &&
        <>
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

        <h3>Invitations</h3>
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
        </>
      }

      { showInsert &&
        <>
            <h3>Create a new list</h3>

            <div className={loginstyles.login_form}>
                <div>
                    <h5>Name</h5>
                    <input
                        type="text"
                        value={newLista.name}
                        name='name'
                        onChange={handleChange} />
                </div>

                <div>
                    <h5>Policy</h5>
                    <div className={loginstyles.checkbox_row}>
                      <div>
                        <p>Public</p>
                        <input
                        type="checkbox"
                        defaultChecked={newLista.public}
                        value={newLista.public}
                        name='public'
                        onChange={handlePublic} />
                      </div>
                    </div>
                    <p className={loginstyles.p_description}>If selected all users can invite other user. Otherwise only cretor of the list can invites.</p>
                </div>

                <div>
                    <h5>Invited Users</h5>
                    <div className={loginstyles.checkbox_row}>
                      <div>
                        <p>Show what booked</p>
                        <input
                        type="checkbox"
                        defaultChecked={newLista.what_bought}
                        value={newLista.what_bought}
                        name='public'
                        onChange={handleWhat} />
                      </div>
                    </div>
                    <p className={loginstyles.p_description}>
                      If selected you can see what desiderio has been
                      booked. (not recommended if you want to keep 
                      the surprise)
                    </p>
                    <div className={loginstyles.checkbox_row}>
                      <div>
                        <p>Show Who booked</p>
                        <input
                        type="checkbox"
                        defaultChecked={newLista.who_bought}
                        value={newLista.who_bought}
                        name='public'
                        onChange={handleWho} />
                      </div>
                    </div>
                    <p className={loginstyles.p_description}>
                      If selected you can see who has booked the
                      desiderio. (not recommended if you want to keep 
                      the surprise)
                    </p>
                </div>
            </div>

            <div className='footer_action'>
                <ButtonAction label={'Save'} action={handleSaveInsert} />
            </div>
        </>
      }

        { 
            showSuccessAlert && 
            <AlertSuccess message={'Your desiderio was registry succesfully.'} />
        }

        {
            showErrorAlert && 
            <AlertError message={message} />
        }
    </Container>
  )
}
