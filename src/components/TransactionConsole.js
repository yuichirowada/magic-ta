import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMagic } from "../MagicProvider";
import Wallet from "./Wallet";

function TransactionConsole() {

    const { isLoggedIn } = useMagic();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) { navigate('/'); }
      }, [isLoggedIn, navigate]);
  
    return (
        <div className="content">
            <h1>Wallet</h1>
            <Wallet />
        </div>
    );
}

export default TransactionConsole;
