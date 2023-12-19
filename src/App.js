import './App.css';
import Auth0HeaderBar from './components/Auth0HeaderBar';
import MagicWalletBar from './components/MagicWalletBar';

import Home from './components/Home';
import TransactionConsole from './components/TransactionConsole';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/wallet", element: <TransactionConsole /> }
]);

function App() {
  return (
    <div className="App">
      <div className="container">
        <Auth0HeaderBar />
        <MagicWalletBar />
        <div className="content">
        <RouterProvider router={router} />
        </div>
      </div>
    </div>
  );
}

export default App;
