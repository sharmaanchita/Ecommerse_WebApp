import axios from "axios";
import {ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQ, CLEAR_ERRORS} from "../Constants/productConstants";

export const getProducts = () => async(dispatch)=> {

    try {
        dispatch({type:ALL_PRODUCT_REQ})
        const { data } = await axios.get("/api/v1/products")
        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message,
        })
    }
}

export const clearErrors = () => async(dispatch)=> {
    dispatch({type:CLEAR_ERRORS})
}

