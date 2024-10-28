import { Outlet } from 'react-router-dom';
import NavBar from './components/Navbar';

import './App.css';

function App() {
  return (
    <div className="bg-slate-500 min-h-screen">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
