import { useState, createContext, useContext, useEffect } from 'react';
import { Magic } from 'magic-sdk';
import { OpenIdExtension } from '@magic-ext/oidc';
import { useAuth0 } from "@auth0/auth0-react";

const networks = {
  goerli: 'goerli',
  polygon: {
    rpcUrl: 'https://polygon-rpc.com/', // Polygon RPC URL
    chainId: 137 // Polygon chain id
  }
};

// Create a context for the authentication state
const MagicOnAuth0OIDCContext = createContext();

export const MagicOnAuth0OIDCProvider = ({ children }) => {

  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  // some of these may be redundant, for debugging
  const [magicUser, setMagicUser] = useState();
  const [didToken, setDidToken] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [provider, setProvider] = useState();
  const [rpcProvider, setRpcProvider] = useState();

  // network selector (default goerli)
  // not all networks are supported just by 'network' property, so this feature is incomplete
  const [network, setNetwork] = useState('goerli');
  const updateNetwork = (newValue) => { setNetwork(newValue); };

  // Initialize Magic instance, shared globally via context
  // it could be outside of this component, but for the network switch feature, it's here
  const [magic, setMagic] = useState(new Magic(process.env.REACT_APP_MAGIC_API_KEY, { network: networks[network], extensions: [new OpenIdExtension()], deferPreload: true }));
  
  useEffect(() => {
    (async function getMagicWallet() {
      console.log('MagicOnAuth0OIDCProvider', network);
      setMagic(new Magic(process.env.REACT_APP_MAGIC_API_KEY, { network: networks[network], extensions: [new OpenIdExtension()], deferPreload: true }));

      // If the user is authenticated with Auth0, log them in with Magic
      if (isAuthenticated && !isLoggedIn) {
        const token = await getIdTokenClaims();
        setDidToken(await magic.openid.loginWithOIDC({
          jwt: token.__raw,
          providerId: process.env.REACT_APP_MAGIC_PROVIDER_ID
        }));
        setIsLoggedIn(await magic.user.isLoggedIn());
      }

      // If the user is logged in with Magic, get the user's info
      if (isLoggedIn) {
        setMagicUser(await magic.user.getInfo());
        setProvider(await magic.wallet.getProvider());
        setRpcProvider(magic.rpcProvider);
      }

    })();

  }, [isAuthenticated, isLoggedIn, network]);

  return (
    <MagicOnAuth0OIDCContext.Provider value={{ magic, magicUser, didToken, isLoggedIn, provider, rpcProvider, networks, network, updateNetwork }}>
      {children}
    </MagicOnAuth0OIDCContext.Provider>
  );
};

// Custom hook to use the auth context
export const useMagicOnAuth0OIDC = () => useContext(MagicOnAuth0OIDCContext);
