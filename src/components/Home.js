import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMagicOnAuth0OIDC } from "../MagicOnAuth0OIDCProvider";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";

function Home() {
    const { isLoggedIn } = useMagicOnAuth0OIDC();
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
      if (isLoggedIn) { navigate('/wallet'); }
    }, [isLoggedIn, navigate]);

    return (
        <div>
            <h1>Home</h1>
            {isAuthenticated ? <p>logging into your wallet...</p> : <p><LoginButton /></p>}
        </div>
        
    );
}

export default Home;
