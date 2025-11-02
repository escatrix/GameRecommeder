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

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/RecomByName' element={<RecomByName/>}/>
        <Route path='/RecomByFeatures' element={<RecomByFeatures/>}/>
        <Route path="/mlmodel" element={<MlModel />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
  
    </BrowserRouter>
  );
}

export default App;
