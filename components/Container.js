import styles from '../styles/Container.module.css';
import Head from 'next/head'

export default function Container ({ children }) {
    return (
    <>
        <Head>
            <link rel="icon" href="/favicon.ico" />
            <meta name="description" content="An application for videogamers"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
            />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrant:wght@100;300;400;500;700;800&display=swap" />
            <title>Desiderando</title>
        </Head>
        <div className={styles.container}>
            <main>{children}</main>
        </div>
    </>
    )
}