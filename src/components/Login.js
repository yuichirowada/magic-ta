import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMagic } from "../MagicProvider";

function Login() {
    const { isLoggedIn, handleOAuthResult } = useMagic();
    const navigate = useNavigate();

    useEffect(() => {
      if (isLoggedIn) { navigate('/wallet'); }
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        handleOAuthResult();
    }, []);

    return (
        <div className="content">
            <div><h1>Logging In...</h1></div>
        </div>
    );
}

export default Login;
