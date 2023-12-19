// identity providers have varying ways to obtain an OIDC token
// this is an example of an OIDC client library's token methods

// issuer domain: psg-net-demo.auth0.com
// discovery document: https://psg-net-demo.auth0.com/.well-known/openid-configuration
// audience: 0e4EKV71pI75vl7nGWSnOGPRuQG9apcM (auth0 client id)
// wallet key: pk_live_8CFF9BECF7B83032
import React, { useState, useEffect } from 'react';
import { Magic } from 'magic-sdk';
import { OpenIdExtension } from '@magic-ext/oidc';
import { useAuth0 } from "@auth0/auth0-react";

const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY, { extensions: [new OpenIdExtension()] });
console.log('magic', magic);

const MagicHeaderBar = () => {
    const { isAuthenticated, user, getIdTokenClaims } = useAuth0();
    const [magicUser, setMagicUser] = useState(magic.user.getInfo());

    useEffect(() => {
        console.log('MagicHeaderBar', isAuthenticated, user);
        if (isAuthenticated) {
            async function getMagicWallet() {
                const token = await getIdTokenClaims();
                console.log('token', token);

                const didToken = await magic.openid.loginWithOIDC({
                    jwt: token.__raw,
                    providerId: process.env.REACT_APP_MAGIC_PROVIDER_ID
                });

                console.log('didToken', didToken);
                setMagicUser(await magic.user.getInfo());
                console.log('magicUser', magicUser);
            }
            getMagicWallet();
        }

    }, [isAuthenticated]);

    if (isAuthenticated) { return <div class="header-bar magic-header-bar"><div>Magic</div><div>{magicUser.email || 'NO EMAIL' }</div></div>; }
    return <div class="header-bar magic-header-bar"><div>Loading ...</div></div>;
};

export default MagicHeaderBar;
