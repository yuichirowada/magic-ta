import './App.css';

import Home from './components/Home';
import TransactionConsole from './components/TransactionConsole';
import DebuggerConsole from "./components/DebuggerConsole";
import Login from "./components/Login";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';


const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/wallet", element: <TransactionConsole /> }
]);

function App() {
  return (
    <div className="App">
      <div className="container">
        <RouterProvider router={router} />
        <DebuggerConsole />
      </div>
    </div>
  );
}

export default App;
