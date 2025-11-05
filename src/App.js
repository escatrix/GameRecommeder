import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage';
import './App.css';
import Home from './pages/Home/Home'
import TrendingGamePage from './pages/TrendingGamePage/TrendingGamePage';
import Footer from './components/Footer/Footer';
import MlModel from './pages/MlModel/MlModel';
import SignUp from "./pages/LoginPage/SignUp";
import RecomByName from "./pages/RecomByName/RecomByName";
import RecomByFeatures from "./pages/RecomByFeatures/RecomByFeatures";
import ProfilePage from "./components/Profile/Profilepage";
import Navbar from "./components/Navbar/Navbar";
import React, { useState } from "react";
function App() {
    const [isLoggedIn , setIsLoggedIn] = useState(!!localStorage.getItem('user'))
    console.log('App state isLoggedIn:', isLoggedIn);  // Matches localStorage check
   useEffect(() => {
    const syncAuth = () => setIsLoggedIn(!!localStorage.getItem('user'));
    window.addEventListener('storage', syncAuth);  // Cross-tab sync
    const interval = setInterval(syncAuth, 500);  // Poll every 0.5s for same-tab
    return () => {
      window.removeEventListener('storage', syncAuth);
      clearInterval(interval);
    };
  }, []);
  return (
     <BrowserRouter>
     <Navbar isLoggedIn ={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/RecomByName' element={<RecomByName/>}/>
        <Route path='/RecomByFeatures' element={<RecomByFeatures/>}/>
        <Route path="/mlmodel" element={<MlModel />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile"  element={<ProfilePage/>}/>
      </Routes> */}
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path='/RecomByName' element={<RecomByName/>}/>
  <Route path='/RecomByFeatures' element={<RecomByFeatures/>}/>
  <Route path="/mlmodel" element={<MlModel />} />
  <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />  {/* Add this! */}
  <Route path="/signup" element={<SignUp setIsLoggedIn={setIsLoggedIn} />} />     {/* Add if SignUp needs it */}
  <Route path="/profile" element={<ProfilePage/>}/>
</Routes>
    </BrowserRouter>
  );
}

export default App;
