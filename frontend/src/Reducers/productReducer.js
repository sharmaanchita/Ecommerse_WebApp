import {ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQ, CLEAR_ERRORS} from "../Constants/productConstants";

export const productReducer = (state = {products:[]}, action) => {

    switch (action.type) {
        case ALL_PRODUCT_REQ:
            return {
                loading: true,
                products: [],
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productCount: action.payload.productCount
            };
        case ALL_PRODUCT_FAIL:
            return {
                loading: false,
                errors: action.payload,
            };  
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null,
            }; 
        default:
            return state;
    }
}