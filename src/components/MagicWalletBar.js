import React, { useState, useEffect } from 'react';
import { useMagicOnAuth0OIDC } from "../MagicOnAuth0OIDCProvider";
import { useAuth0 } from "@auth0/auth0-react";


const MagicHeaderBar = () => {
    const { magicUser, isLoggedIn } = useMagicOnAuth0OIDC();
    const { isAuthenticated } = useAuth0();

    if (isLoggedIn && magicUser) { return <div className="header-bar magic-header-bar"><div>Magic</div><div>{magicUser.email || 'NO EMAIL' }</div></div>; }
    if (isLoggedIn && isAuthenticated) { return <div className="header-bar magic-header-bar"><div>Magic</div><div>Loading ...</div></div>; }
    return <div className="header-bar magic-header-bar"><div>Magic</div><div>-</div></div>;
};

export default MagicHeaderBar;
