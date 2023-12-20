import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMagic } from "../MagicProvider";
import LoginButton from "./LoginButton";

function Home() {
    const { isLoggedIn } = useMagic();
    const navigate = useNavigate();

    useEffect(() => {
      if (isLoggedIn) { navigate('/wallet'); }
    }, [isLoggedIn, navigate]);


    return (
        <div className="content">
            {isLoggedIn ? <div><a href="/wallet">Go to wallet!</a></div> : <div><h1>Login to start transaction!</h1><p><LoginButton /></p></div>}
        </div>
    );
}

export default Home;
