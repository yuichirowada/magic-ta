import { useState, createContext, useContext, useEffect } from 'react';
import { Magic } from 'magic-sdk';
import { OpenIdExtension } from '@magic-ext/oidc';
import { useAuth0 } from "@auth0/auth0-react";

// import { ethers } from "ethers";
import Web3 from 'web3';

console.log(Web3.utils, Web3.modules, Web3.providers);

// Create a context for the authentication state
const MagicContext = createContext();

export const MagicProvider = ({ children }) => {

  const { isAuthenticated, getIdTokenClaims } = useAuth0();

  // some of these may be redundant, for debugging
  const [didToken, setDidToken] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [magicUser, setMagicUser] = useState();
  const [accountBalance, setAccountBalance] = useState();
  const [jwt, setJwt] = useState();

  // Initialize Magic instance, shared globally via context
  const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY, { extensions: [new OpenIdExtension()], deferPreload: true });

  const web3 = new Web3(magic.rpcProvider);
  // const ethersProvider = new ethers.BrowserProvider(magic.rpcProvider);

  console.log(web3);

  useEffect(() => {
    (async function getBalance() {
      const isLoggedIn = await magic.user.isLoggedIn();
      if (isLoggedIn && magicUser) {

        console.log('getting eth balance', web3.eth, magicUser.publicAddress);
        const weiBalance = await web3.eth.getBalance(magicUser.publicAddress);
        const ethBalance = parseFloat(web3.utils.fromWei(weiBalance, 'ether'));

        // const weiBalance = await ethersProvider.getBalance(magicUser.publicAddress);
        // const ethBalance = ethers.formatEther(weiBalance);

        console.log(weiBalance, ethBalance);
        setAccountBalance(ethBalance);
      }
    })();
  }, [magicUser]);

  useEffect(() => {
    (async function getMagicWallet() {

      // If the user is authenticated with Auth0, log them in with Magic
      if (isAuthenticated) {
        const token = await getIdTokenClaims();
        setJwt(token);
        setDidToken(await magic.openid.loginWithOIDC({
          jwt: token.__raw,
          providerId: process.env.REACT_APP_MAGIC_PROVIDER_ID
        }));
        setIsLoggedIn(await magic.user.isLoggedIn());
      }
      if (isLoggedIn) {
        setMagicUser(await magic.user.getInfo());
      }

    })();

  }, [isAuthenticated, isLoggedIn]);



  return (
    <MagicContext.Provider value={{ magic, didToken, isLoggedIn, magicUser, accountBalance, jwt, web3 }}>
      {children}
    </MagicContext.Provider>
  );
};

// Custom hook to use the auth context
export const useMagic = () => useContext(MagicContext);
