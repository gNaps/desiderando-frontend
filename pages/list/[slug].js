import Container from '../../components/Container'
import NavBar from '../../components/NavBar'
import ItemList from '../../components/ItemList'
import ButtonAction from '../../components/ButtonAction'
import ConfirmDelete from '../../components/ConfirmDelete'
import AlertSuccess from '../../components/AlertSuccess'
import AlertError from '../../components/AlertError'
import Invitation from '../../components/Invitation'

import AuthContext from '../../context/AuthContext'

import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr'
import { useEffect, useState, useContext } from 'react';
import cookie from 'js-cookie';

import { API_URL } from '../../utils/url';

import loginstyles from '../../styles/Login.module.css'
import styles from '../../styles/ListaDesideri.module.css'
import Router from 'next/router'

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
    
    const handleShowInsert = () => {
        setShowInsert(true)
    }

    const handleSaveInsert = async () => {
        console.log('inserisco: ', newDesiderio)

        const request = {
            method: 'POST',
            body: JSON.stringify(newDesiderio),
            headers: {
                'Authorization': `Bearer ${cookie.get('jwt')}`, 
                'Content-Type': 'application/json'
            }
        };

        const response_res = await fetch(`${API_URL}/desiderioitems/${list.id}`, request)
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
            setSuccessMessage("Your desiderio was registry succesfully.")

            setTimeout(() => {
                setSuccessAlert(false)
                setSuccessMessage("");
            }, 1500)
            
            const newDesiderioitems = [ ... list.desiderioitems ]
            newDesiderioitems.push(response)
            mutate(`${API_URL}/desideriolists/?slug=${slug}`, { ...list, desiderioitems: newDesiderioitems })
        }
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setNewDesiderio(newDesiderio => ({...newDesiderio, [name]: value}))
    }

    const handleChangeCategory = (category) => {
        setNewDesiderio(newDesiderio => ({...newDesiderio, category:  category}))
    }

    const handleShowInvitation = () => {
        setShowInvitation(true)
    }

    const handleInvites = async (username) => {
        console.log('invito: ', username)

        await fetch(`${API_URL}/desideriolists/invites/${list.id}`, {
            method: 'PUT',
            body: JSON.stringify({username: username}),
            headers: {
                'Authorization': `Bearer ${cookie.get('jwt')}`, 
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if(!data.message) {
                setSuccessAlert(true)
                setShowInvitation(false)
                setSuccessMessage("User invited succesfully!")

                setTimeout(() => {
                    setSuccessAlert(false)
                    setSuccessMessage("");
                }, 1500)
            } else {
                console.log(data)
                setShowInvitation(false)
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

    const handleSaveTitle = async () => {
        if(title === list.name) {
            return;
        }

        const request = {
            method: 'PUT',
            body: JSON.stringify({listName: title}),
            headers: {
                'Authorization': `Bearer ${cookie.get('jwt')}`, 
                'Content-Type': 'application/json'
            }
        };

        const response_res = await fetch(`${API_URL}/desideriolists/${list.id}`, request);
        const response = await response_res.json();

        console.log(response)
        
        if(response.statusCode) {
            setErrorAlert(true)
            setMessage(response.message)

            setTimeout(() => {
                setErrorAlert(false)
                setMessage('')
            }, 1500);
        } else {
            setSuccessAlert(true)
            setShowInvitation(false)
            setSuccessMessage("Name updated succcesfully!")

            setTimeout(() => {
                setSuccessAlert(false)
                setSuccessMessage("");
            }, 1500)

            mutate(`${API_URL}/desideriolists/?slug=${slug}`, { ...list, name: response.name })
        }
    }

    const handleDeleteInvitation = () => {
        setShowInvitation(false);
    }

    const handleDeleteList = async () => {
        const request = {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${cookie.get('jwt')}`, 
                'Content-Type': 'application/json'
            }
        };

        const response_res = await fetch(`${API_URL}/desideriolists/${list.id}`, request)
        const response = await response_res.json()

        setShowIDeleteAlert(false);
        console.log(response)
        
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
            setSuccessMessage("Your lista dei desideri was deleted succesfully.")

            setTimeout(() => {
                setSuccessAlert(false)
                setSuccessMessage("");
            }, 1500)
            
            Router.push('/');
        }
    }

    const { user } = useContext(AuthContext)

    const [showInsert, setShowInsert] = useState(false)
    const [newDesiderio, setNewDesiderio] = useState({name: '', description: '', place: '', price: 0, category: 1})

    const [showSuccessAlert, setSuccessAlert] = useState(false)
    const [showErrorAlert, setErrorAlert] = useState(false)
    const [message, setMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const [showInvitation, setShowInvitation] = useState(false)
    const [showDeleteAlert, setShowIDeleteAlert] = useState(false)
    
    const [editTitle, setEditTitle] = useState(false)

    let defaultTitle = "";
    if(list) {
        defaultTitle = list.name;
    }

    const [title, setTitle] = useState(defaultTitle)
   

    return (
        <Container>
        <NavBar />
        { list && !showInsert &&
            <>
            <div className={styles.title}>
                <div className={styles.name}>
                    { !editTitle &&
                        <h3>{list.name}</h3>
                    }
                    { editTitle &&
                        <div className={loginstyles.login_form}>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => { setTitle(e.target.value) }} />
                        </div>
                    }
                    { user && list && user.id === list.users && !showInsert &&
                        <div className={styles.action}>
                            { !editTitle && 
                                <i class="fas fa-pencil-alt" onClick={() => setEditTitle(true)}/>
                            }
                            { editTitle && 
                                <i class="fas fa-check" onClick={() => { handleSaveTitle(); setEditTitle(false)} }/>
                            }
                            <i class="fas fa-share-alt" onClick={() => handleShowInvitation()}/>
                            <i class="fas fa-trash" onClick={() => {setShowIDeleteAlert(true);}}/>
                        </div>
                    }
                </div>

                { list && 
                    <div className={styles.owner}>
                        <i class="fas fa-user" />
                        <p>{list.owner}</p>
                    </div>
                }
            </div>

            <div className={styles.desideri_container}>
                {list.desiderioitems.map((desiderio) => (
                    <ItemList desiderio={desiderio} category={desiderio.category} key={desiderio.id}/>
                ))} 
            </div>
            </>
        }
        
        { user && list && user.id === list.users && !showInsert &&
            <div className='footer_action'>
                <ButtonAction label={'New desiderio'} action={handleShowInsert} />
            </div>
        }

        { list && showInsert &&
            <>
                <h3>Insert new desiderio</h3>

                <div className={loginstyles.login_form}>
                    <div>
                        <h5>Name</h5>
                        <input
                            type="text"
                            value={newDesiderio.name}
                            name='name'
                            onChange={handleChange} />
                    </div>

                    <div>
                        <h5>Description <span className={loginstyles.p_description}>(optional)</span></h5>
                        <input
                            type="text"
                            value={newDesiderio.description}
                            name='description'
                            onChange={handleChange} />
                    </div>

                    <div>
                        <h5>Price</h5>
                        <input
                            type="number"
                            value={newDesiderio.price}
                            name='price'
                            onChange={handleChange} />
                    </div>

                    <div>
                        <h5>Where to buy it</h5>
                        <p className={loginstyles.p_description}>Link the url or the name of the shop.</p>
                        <input
                            type="text"
                            value={newDesiderio.place}
                            name='place'
                            onChange={handleChange} />
                    </div>

                    <div>
                        <h5>Category</h5>
                        {/* <input
                            type="text"
                            value={newDesiderio.description}
                            name='description'
                            onChange={handleChange} /> */}
                        <div className='container_category'>
                            <div 
                                className={`${newDesiderio.category === 1 ? 'card_category active' : 'card_category'}`}
                                onClick={() => handleChangeCategory(1)}
                            >
                                { newDesiderio.category !== 1 
                                     ? (<img src={'/category-collection-dark.svg'} style={{height: '32px'}} />)
                                     : (<img src={'/category-collection.svg'} style={{height: '32px'}} />)
                                }
                                <p>Collecting</p>
                            </div>

                            <div 
                                className={`${newDesiderio.category === 2 ? 'card_category active' : 'card_category'}`}
                                onClick={() => handleChangeCategory(2)}
                            >
                                <i class="fas fa-laptop fa-2x" />
                                <p>Tecnology</p>
                            </div>

                            <div
                                className={`${newDesiderio.category === 3 ? 'card_category active' : 'card_category'}`}
                                onClick={() => handleChangeCategory(3)}
                            >
                                <i class="fas fa-tshirt fa-2x" />
                                <p>Fashion</p>
                            </div>

                            <div 
                                className={`${newDesiderio.category === 4 ? 'card_category active' : 'card_category'}`}
                                onClick={() => handleChangeCategory(4)}
                            >
                                <i class="fas fa-book fa-2x" />
                                <p>Book</p>
                            </div>

                            <div 
                                className={`${newDesiderio.category === 5 ? 'card_category active' : 'card_category'}`}
                                onClick={() => handleChangeCategory(5)}
                            >
                                <i class="fas fa-plane fa-2x" />
                                <p>Travel</p>
                            </div>

                            <div 
                                className={`${newDesiderio.category === 6 ? 'card_category active' : 'card_category'}`}
                                onClick={() => handleChangeCategory(6)}
                            >
                                <i class="fas fa-home fa-2x" />
                                <p>For Home</p>
                            </div>

                            <div 
                                className={`${newDesiderio.category === 7 ? 'card_category active' : 'card_category'}`}
                                onClick={() => handleChangeCategory(7)}
                            >
                                <i class="far fa-gem fa-2x" />
                                <p>Other</p>
                            </div>
                        </div>  
                    </div>
                </div>

                <div className='footer_action'>
                    <ButtonAction label={'Save'} action={handleSaveInsert} />
                </div>
            </>
        }

        {
            showSuccessAlert && 
            <AlertSuccess message={successMessage} />
        }

        {
            showErrorAlert && 
            <AlertError message={message} />
        }

        {
            showInvitation && 
            <Invitation id={list.id} handleClick={handleInvites} handleDelete={handleDeleteInvitation}/>
        }

        {
            showDeleteAlert && 
            <ConfirmDelete id={list.id} message={"Confirm delete of this list?"} handleDelete={handleDeleteList} handleBack={() => {setShowIDeleteAlert(false)}} />
        }
        </Container>
    )
}