import React from 'react'
import { useState, createContext, useContext } from 'react';
import { Magic } from 'magic-sdk';
import { OpenIdExtension } from '@magic-ext/oidc';
import { useAuth0 } from "@auth0/auth0-react";

const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY, { extensions: [new OpenIdExtension()] });
console.log('magic', magic);

// Create a context for the authentication state
const MagicOnAuth0OIDCContext = createContext();

export const MagicOnAuth0OIDCProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    // additional login logic
  };

  const logout = () => {
    setUser(null);
    // additional logout logic
  };

  return (
    <MagicOnAuth0OIDCContext.Provider value={{ user, login, logout }}>
      {children}
    </MagicOnAuth0OIDCContext.Provider>
  );
};

// Custom hook to use the auth context
export const useMagicOnAuth0OIDC = () => useContext(MagicContext);
