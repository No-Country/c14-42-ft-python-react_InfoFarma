import axios from 'axios'
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const FILTER_BY_ALPHABETIC = 'FILTER_BY_ALPHABETIC';
export const ORDER_BY = 'ORDER_BY';   

export const getAllProducts = () => {
    return async function (dispatch) {
        try {
            const response = await axios('https://info-farma-backend.onrender.com/productos');
            const allProducts = response.data;
            // console.log({allProducts})

            return dispatch({
                type: GET_ALL_PRODUCTS,
                payload: allProducts
            })
        } catch(error) {
            console.log(error);
        }
    }
}

export const filterAlphabetic = (letra) => {
    try {
        return {
            type: FILTER_BY_ALPHABETIC,
            payload: letra
        }
    } catch(error) {
        console.log(error.message);
    }    
} 

export const orderBy = (order) => {
    try {
        return {
            type: ORDER_BY,
            payload: order
        }
    } catch(error) {
        console.log(error.message);
    }
}