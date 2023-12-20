import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { MagicProvider } from './MagicProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
            <MagicProvider>
                <App />
            </MagicProvider>
    </React.StrictMode>
);
