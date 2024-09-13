import React from 'react'
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";


const options ={
    edit:false,
    color:"#eda8bb",
    activeColor: "#ca6380", 
    size: window.innerWidth <600 ? 20:25,
    value:2.5,
    isHalf: true,
}
const Product = ({product}) => {
  return (
    <Link className='productCard' to={product._id}>
        <img src={product.images[0].url} alt={product.name}/>
        <p>{product.name}</p>
        <div>
            <ReactStars {...options}/> 
            <span>(256 Reviews)</span>
        </div>
        <span>Rs. {product.price}</span>
    </Link>
  )
}

export default Product