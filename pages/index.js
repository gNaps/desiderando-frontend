import cookie from 'js-cookie';
import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'
import useSWR, { mutate } from 'swr'

import Container from '../components/Container'
import NavBar from '../components/NavBar'
import MyList from '../components/MyList'
import InvitedList from '../components/InvitedList'
import ButtonAction from '../components/ButtonAction'
import AlertSuccess from '../components/AlertSuccess'
import AlertError from '../components/AlertError'

import { API_URL } from '../utils/url';

import loginstyles from '../styles/Login.module.css'

import AuthContext from '../context/AuthContext'

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

    const request = {
      method: 'POST',
      body: JSON.stringify(newLista),
      headers: {
          'Authorization': `Bearer ${cookie.get('jwt')}`, 
          'Content-Type': 'application/json'
      }
    };
    const response_res = await fetch(`${API_URL}/desideriolists`, request);
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
        setShowInsert(false)
        setNewLista({name: '', public: false, required_password: false, what_bought: false, who_bought: false});
        setSuccessMessage("Your list was registry succesfully.")

        setTimeout(() => {
            setSuccessAlert(false)
            setSuccessMessage("");
        }, 1500)
        
        const newListaDesideri = [ ...listadesideri ]
        newListaDesideri.push(response)
        mutate(`${API_URL}/desideriolists`, { ...newListaDesideri })
    };
  }

  const deleteInsert = () => {
    setShowInsert(false);
    setNewLista({name: '', public: false, required_password: false, what_bought: false, who_bought: false});
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
  const [successMessage, setSuccessMessage] = useState('')

  const { user } = useContext(AuthContext)

  return (
    <Container>
      <NavBar />

      {
        !showInsert &&
        <>
        <div style={{minHeight: 'calc(100vh - 250px)'}}>
        { user && <h5>Hi {user.username}!</h5>}
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
        </div>

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
                <button 
                  className={loginstyles.button_delete_insert}
                  onClick={() => deleteInsert()}>
                  <p>Delete</p>
                </button>
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
