import React from "react";
import LoginButton from "./LoginButton";
import { useAuth0 } from "@auth0/auth0-react";

const Auth0HeaderBar = () => {
  const { user, isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();
  console.log('auth0 user', user);

  if (isLoading) { return <div class="header-bar auth0-header-bar"><div>Loading ...</div></div>; }
  if (isAuthenticated) { return <div class="header-bar auth0-header-bar"><div>Auth0</div><div>{user.name || 'NO NAME'} ({user.email || 'NO EMAIL' }) <LoginButton /></div></div>; }
  return <div class="header-bar auth0-header-bar"><div><LoginButton /></div></div>;
};

export default Auth0HeaderBar;