import React from "react";
import { useMagic } from "../MagicProvider";

const LoginButton = () => {
  const { magic, isLoggedIn, beginOAuthFlow } = useMagic();

  async function logoutAll() {
    await magic.user.logout();
  }

  return isLoggedIn ? 
    <button className="button" onClick={async () => await magic.user.logout()}>Logout</button> : 
    <button className="button" onClick={() => beginOAuthFlow()}>Login</button>;
};

export default LoginButton;