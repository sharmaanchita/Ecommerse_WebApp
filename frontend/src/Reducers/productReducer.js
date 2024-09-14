import {ALL_PRODUCT_FAIL, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_REQ, CLEAR_ERRORS} from "../Constants/productConstants";

export const productReducer = (state = {product:[]}, action) => {

    switch (action.type) {
        case ALL_PRODUCT_REQ:
            return {
                loading: true,
                product: [],
            };
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload.product,
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