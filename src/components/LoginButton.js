import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useMagicOnAuth0OIDC } from "../MagicOnAuth0OIDCProvider";

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();
  const { magic } = useMagicOnAuth0OIDC();

  async function logoutAll() {
    logout({ logoutParams: { returnTo: window.location.origin } });
    await magic.user.logout();
  }

  return isAuthenticated ? 
    <button className="button" onClick={() => logoutAll()}>Logout</button> : 
    <button className="button" onClick={() => loginWithRedirect()}>Login</button>;
};

export default LoginButton;