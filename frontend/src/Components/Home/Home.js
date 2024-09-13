import React from 'react'
import {CgMouse} from "react-icons/cg"
import "./Home.css"
import Product from "./Product.js"

const product ={
    id_ : "something",
    price: 6200,
    name: "dress",
    images: [{url:"https://i.ibb.co/DRST11n/1.webp"}] 
};

const Home = () => {
  return <>
    <div className='banner'>
        <p>Welcome to Shopisy</p>
        <h1>We have everything for everyone below</h1>
        <a href='#container'>
            <button>Scroll<CgMouse/></button>
        </a>
    </div>

    <h2 className='homeHeading'>Best-seller items</h2>

    <div className='container' id='container'>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>
        <Product product={product}/>    
            
        <Product product={product}/>        
        <Product product={product}/>        
        <Product product={product}/>        
        <Product product={product}/>        

    </div>
  </>
}

export default Home