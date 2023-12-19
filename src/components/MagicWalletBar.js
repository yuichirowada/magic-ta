import React, { useState, useEffect } from 'react';
import { useMagicOnAuth0OIDC } from "../MagicOnAuth0OIDCProvider";


const MagicHeaderBar = () => {
    const { magicUser, isLoggedIn } = useMagicOnAuth0OIDC();

    if (isLoggedIn && magicUser) { return <div className="header-bar magic-header-bar"><div>Magic</div><div>{magicUser.email || 'NO EMAIL' }</div></div>; }
    if (isLoggedIn) { return <div className="header-bar magic-header-bar"><div>Magic</div><div>Loading ...</div></div>; }
    return <div className="header-bar magic-header-bar"><div>Magic</div><div>-</div></div>;
};

export default MagicHeaderBar;
