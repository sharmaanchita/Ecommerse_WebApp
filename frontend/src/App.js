import React from "react";
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import webFont from "webfontloader";
import './App.css';
import Header from "./Components/layout/Header/Header.js";
import Footer from './Components/layout/Footer/Footer.js';
import Home from "./Components/Home/Home.js";


function App() {
  React.useEffect(()=>{
    webFont.load({
      google:{
        families:["Roboto", "Droid Sans", "Chilanka"],
      },
    })
  }); 

  return(<Router>
      <Header/>
      <Routes>
      <Route exact path ="/" Component={Home}/>
      </Routes>
      <Footer/>
   </Router>);
}

export default App;
