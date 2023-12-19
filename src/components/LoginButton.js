import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return isAuthenticated ? <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</button> : <button onClick={() => loginWithRedirect()}>Login</button>;
};

export default LoginButton;