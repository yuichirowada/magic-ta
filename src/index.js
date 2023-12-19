import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { Auth0Provider } from '@auth0/auth0-react';
import { MagicOnAuth0OIDCProvider } from './MagicOnAuth0OIDCProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
            useRefreshTokens={true}
            cacheLocation='localstorage'
            authorizationParams={{
                redirect_uri: window.location.origin
            }}
        >
            <MagicOnAuth0OIDCProvider>
                <App />
            </MagicOnAuth0OIDCProvider>
        </Auth0Provider>
    </React.StrictMode>
);
