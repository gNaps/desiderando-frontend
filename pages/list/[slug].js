import Container from '../../components/Container'
import NavBar from '../../components/NavBar'
import ItemList from '../../components/ItemList'
import ButtonAction from '../../components/ButtonAction'

import Link from 'next/link'

export default function List() {

    const list = {
        id: 1,
        name: "Wishlist of napsryu",
        what_bought: true,
        who_bought: true,
        slug: "wishlist-of-napsryu",
        desiderioitems: [
            {
                id: 1,
                name: "demon slayer action figures",
                price: 199.99,
                category: 1,
                slug: "demon-slayer-action-figures",
                bought_by: null,
            },
            {
                id: 2,
                name: "Gosht of Tsushima",
                price: 49.99,
                category: 1,
                slug: "gosht-of-tsushima",
                bought_by: null,
            },
            {
                id: 3,
                name: "Felpa con dragone",
                price: 25.99,
                category: 3,
                slug: "felpa-con-dragone",
                bought_by: null,
            }
        ]
    }

    const handleClick = () => {
        console.log('clicked on desiderio')
    }

    return (
        <Container>
        <NavBar />
        <h3>{list.name}</h3>

        {list.desiderioitems.map((desiderio) => (
            <ItemList desiderio={desiderio} key={desiderio.id}/>
        ))}
        <div class='footer_action'>
            <ButtonAction label={'New list'} action={handleClick} />
        </div>
        </Container>
    )
}
