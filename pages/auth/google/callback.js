import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import React, { useEffect, useState } from 'react';

import { SSO_GOOGLE_URL } from '../../utils/url';

const GoogleAuth = () => {
    const r = useRouter();
    const location = r;

    useEffect(() => {
        const setUser = async() => {
            const response_res = await fetch(`${SSO_GOOGLE_URL}${location.asPath}`)
            const response = await response_res.json()
            
            if(response.statusCode) {
                console.log('ERRORE')
                console.log(response)
            } else {
                cookie.set('jwt', response.jwt);
                r.replace('/');
            }
        }

        setUser();
    }, []);

    return (
        <p>Elaborazione</p>
    )
}

export default GoogleAuth;
