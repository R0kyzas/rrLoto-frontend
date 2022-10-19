import './Assets/reset.css';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import { Routes, Route } from "react-router-dom";
import Profile from './Pages/Profile';
import Home from './Pages/Home';
import Other from './Pages/Other';
import Login from './Pages/Login';
import Admin from './Pages/Admin';

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="other" element={<Other />} />
        <Route path="admin" element={<Admin />} />
        <Route path="login" element={<Login />} />
      </Routes>
      <Navbar />
    </>
  );
}

export default App;
