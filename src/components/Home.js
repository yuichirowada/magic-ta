import { useMagicOnAuth0OIDC } from "../MagicOnAuth0OIDCProvider";

function Home() {
    const { isLoggedIn } = useMagicOnAuth0OIDC();
    return (
        <div>
            <h1>Home</h1>
            {isLoggedIn ? <p>Logged in - go to your wallet</p> : <p>Not logged in</p>}
        </div>
        
    );
}

export default Home;
