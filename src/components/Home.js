import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMagic } from "../MagicProvider";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";

function Home() {
    const { isLoggedIn } = useMagic();
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
      if (isLoggedIn) { navigate('/wallet'); }
    }, [isLoggedIn, navigate]);

    return (
        <div className="content">
            
            {isAuthenticated ? <p>logging into your wallet...</p> : <div><h1>Login to start transaction!</h1><p><LoginButton /></p></div>}
        </div>
        
    );
}

export default Home;
