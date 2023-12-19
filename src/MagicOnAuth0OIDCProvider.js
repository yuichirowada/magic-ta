import { useState, createContext, useContext, useEffect } from 'react';
import { Magic } from 'magic-sdk';
import { OpenIdExtension } from '@magic-ext/oidc';
import { useAuth0 } from "@auth0/auth0-react";

const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY, { extensions: [new OpenIdExtension()], deferPreload: true });
console.log('magic', magic);

// Create a context for the authentication state
const MagicOnAuth0OIDCContext = createContext();

export const MagicOnAuth0OIDCProvider = ({ children }) => {

  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const [magicUser, setMagicUser] = useState();
  const [magicUserMetadata, setMagicUserMetadata] = useState();
  const [didToken, setDidToken] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [magicWallet, setMagicWallet] = useState();
  const [provider, setProvider] = useState();
  const [rpcProvider, setRpcProvider] = useState();

  useEffect(() => {
    console.log('MagicOnAuth0OIDCProvider', isAuthenticated);
    (async function getMagicWallet() {
      if (isAuthenticated && !isLoggedIn) {
        const token = await getIdTokenClaims();
        console.log('token', token);
        setDidToken(await magic.openid.loginWithOIDC({
          jwt: token.__raw,
          providerId: process.env.REACT_APP_MAGIC_PROVIDER_ID
        }));
        setIsLoggedIn(await magic.user.isLoggedIn());
      }

      if (isLoggedIn) {
        setMagicUser(await magic.user.getInfo());
        setMagicUserMetadata(await magic.user.getMetadata());
        setMagicWallet(await magic.wallet.getInfo());
        setProvider(await magic.wallet.getProvider());
        setRpcProvider(magic.rpcProvider);
      }
      
      console.log('isLoggedIn', isLoggedIn, 'magicUser', magicUser);
    })();

  }, [isAuthenticated, isLoggedIn]);

  return (
    <MagicOnAuth0OIDCContext.Provider value={{ magic, magicUser, didToken, isLoggedIn, magicUserMetadata, magicWallet, provider, rpcProvider }}>
      {children}
    </MagicOnAuth0OIDCContext.Provider>
  );
};

// Custom hook to use the auth context
export const useMagicOnAuth0OIDC = () => useContext(MagicOnAuth0OIDCContext);
