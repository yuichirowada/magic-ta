import './App.css';
import Auth0HeaderBar from './components/Auth0HeaderBar';

import Home from './components/Home';
import TransactionConsole from './components/TransactionConsole';
import DebuggerConsole from "./components/DebuggerConsole";

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
        <RouterProvider router={router} />
        {/* <DebuggerConsole /> */}
      </div>
    </div>
  );
}

export default App;
