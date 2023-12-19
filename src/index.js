import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';

import { Auth0Provider } from '@auth0/auth0-react';

const router = createBrowserRouter([
    { path: "/", element: <App /> },
    { path: "/profile", element: <App /> }
]);

console.log(process.env);

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
            <RouterProvider router={router} />
        </Auth0Provider>
    </React.StrictMode>
);
