import Container from '../../components/Container'
import NavBar from '../../components/NavBar'
import ButtonAction from '../../components/ButtonAction'
import styles from '../../styles/Desiderio.module.css'



export default function Desiderio() {

    const desiderio = {
        id: 1,
        name: "demon slayer action figures",
        description: "Action figures of anime demon slayer. Character Tanjiro",
        place: "http://amazon/actionfigures",
        users: 1,
        price: 199.99,
        category: 1,
        slug: "demon-slayer-action-figures",
        bought_by: 'someone'
    }

    const handleClick = () => {
        console.log('you have booked desiderio')
    }

    return (
        <Container>
        <NavBar />

        {desiderio && desiderio.bought_by !== null &&
            <div className={styles.bought_by}>
                <p>
                    This desiderio is booked by {desiderio.bought_by}
                </p>
            </div>
        }

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
        
        {desiderio && desiderio.bought_by === null &&
            <div class='footer_action'>
                <ButtonAction label={'Book desiderio'} action={handleClick} />
            </div>
        }
        </Container>
    )
}
