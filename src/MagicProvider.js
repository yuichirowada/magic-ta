import { useState, createContext, useContext, useEffect } from 'react';
import { Magic } from 'magic-sdk';
import { OAuthExtension } from '@magic-ext/oauth';

import { ethers } from "ethers";


// Create a context for the authentication state
const MagicContext = createContext();

export const MagicProvider = ({ children }) => {

  // some of these may be redundant, for debugging
  const [didToken, setDidToken] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [magicUser, setMagicUser] = useState();
  const [accountBalance, setAccountBalance] = useState();

  // Initialize Magic instance, shared globally via context
  const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY, { network: 'goerli', extensions: [new OAuthExtension()], deferPreload: true });

  const provider = new ethers.BrowserProvider(magic.rpcProvider);
  useEffect(() => {
    (async function getBalance() {
      if (isLoggedIn && magicUser) {
        const weiBalance = await provider.getBalance(magicUser.publicAddress);
        const ethBalance = ethers.formatEther(weiBalance);
        console.log(weiBalance, ethBalance);
        setAccountBalance(ethBalance);
      }
    })();
  }, [magicUser]);

  // Assumes you've initialized a `Magic` instance with a Dedicated Wallet API Key
  const beginOAuthFlow = async () => {
    await magic.oauth.loginWithRedirect({
      provider: 'google' /* 'google', 'facebook', 'apple', or 'github'   */,
      redirectURI: window.location.origin + '/login',
      scope: ['https://www.googleapis.com/auth/userinfo.email'] /* optional */,
    });
  }

  // Call this upon redirect back to application
  const handleOAuthResult = async () => {
    try {
      const result = await magic.oauth.getRedirectResult();
      console.log(`OAuth result: ${result}`);
  
      // Handle result information as needed
      setIsLoggedIn(await magic.user.isLoggedIn());
      setMagicUser(await magic.user.getInfo());
    } catch (error) {
      console.error('OAuth callback error:', error);
    }
  }

  return (
    <MagicContext.Provider value={{ magic, isLoggedIn, magicUser, accountBalance, beginOAuthFlow, handleOAuthResult }}>
      {children}
    </MagicContext.Provider>
  );
};

// Custom hook to use the auth context
export const useMagic = () => useContext(MagicContext);
