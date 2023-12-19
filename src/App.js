import './App.css';
import LoginButton from './components/LoginButton';
import Auth0HeaderBar from './components/Auth0HeaderBar';
import MagicWalletBar from './components/MagicWalletBar';

function App() {
  return (
    <div className="App">
      <Auth0HeaderBar />
      <MagicWalletBar />
      <header className="App-header">
        <LoginButton />
      </header>
    </div>
  );
}

export default App;
