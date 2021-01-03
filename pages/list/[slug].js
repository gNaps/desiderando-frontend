import Container from '../../components/Container'
import NavBar from '../../components/NavBar'
import ItemList from '../../components/ItemList'
import ButtonAction from '../../components/ButtonAction'
import AlertSuccess from '../../components/AlertSuccess'
import AlertError from '../../components/AlertError'
import Invitation from '../../components/Invitation'

import AuthContext from '../../context/AuthContext'

import { useRouter } from 'next/router';
import useSWR from 'swr'
import { useEffect, useState, useContext } from 'react';
import cookie from 'js-cookie';

import { API_URL } from '../../utils/url';

import loginstyles from '../../styles/Login.module.css'
import styles from '../../styles/ListaDesideri.module.css'

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

        await fetch(`${API_URL}/desiderioitems/${list.id}`, {
            method: 'POST',
            body: JSON.stringify(newDesiderio),
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

                setTimeout(() => {
                    setSuccessAlert(false)
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

    const { user } = useContext(AuthContext)

    const [showInsert, setShowInsert] = useState(false)
    const [newDesiderio, setNewDesiderio] = useState({name: '', description: '', place: '', price: 0, category: 1})

    const [showSuccessAlert, setSuccessAlert] = useState(false)
    const [showErrorAlert, setErrorAlert] = useState(false)
    const [message, setMessage] = useState('')

    const [showInvitation, setShowInvitation] = useState(false)

    return (
        <Container>
        <NavBar />
        { list && !showInsert &&
            <>
            <div className={styles.title}>
                <h3>{list.name}</h3>

                { user && list && user.id === list.users && !showInsert &&
                    
                    <i class="fas fa-share-alt" onClick={() => handleShowInvitation()}/>
                    
                }
            </div>

             {list.desiderioitems.map((desiderio) => (
                <ItemList desiderio={desiderio} category={desiderio.category} key={desiderio.id}/>
            ))} 
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
            <AlertSuccess message={'Your desiderio was registry succesfully.'} />
        }

        {
            showErrorAlert && 
            <AlertError message={message} />
        }

        {
            showInvitation && 
            <Invitation id={list.id} handleClick={handleInvites} />
        }
        </Container>
    )
}