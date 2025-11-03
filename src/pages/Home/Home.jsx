import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import TrendingGamePage from "../TrendingGamePage/TrendingGamePage";
import StreamerToolSection from "../../components/StreamerToolSection/StreamerToolSection";
import Footer from "../../components/Footer/Footer";
import MlModel from "../MlModel/MlModel";
import LoginPage from "../LoginPage/LoginPage";
import ProfilePage from "../../components/Profile/Profilepage";

function Home(){
    return(
        <div className="home">
    
        <Navbar className='navbar'/>
       
        <Hero className='hero'/>
         <MlModel/>
        <StreamerToolSection className='streamer'/>
        <TrendingGamePage/>
        <Footer/>
    
        
     
        </div>
    )
}
export default Home