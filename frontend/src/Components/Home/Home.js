import {React,useEffect} from 'react'
import {CgMouse} from "react-icons/cg"
import "./Home.css"
import Product from "./Product.js"
import MetaData from "../layout/MetaData.js" 
import {getProducts} from "../../Actions/productAction.js";
import {useDispatch, useSelector, connect} from "react-redux";

const Home = () => {

  //REDUX store getproduct action using constants and change state by reducer --PRODUCT  
  const dispatch = useDispatch();
  const {products, productCount, loading, errors} = useSelector((state)=> state.products);


  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  
  return <>
    <MetaData title="Shopisy"/>
    <div className='banner'>
        <p>Welcome to Shopisy</p>
        <h1>We have everything for everyone below</h1>
        <a href='#container'>
            <button>Scroll<CgMouse/></button>
        </a>
    </div>

    <h2 className='homeHeading'>Best-Seller Items</h2>

    <div className='container' id='container'>
      {products && products.map((p) => (
          <Product key={p._id} product={p}/> 
        ))}   
    </div>
  </>
}

export default Home