import axios from 'axios'

export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';

export const getAllProducts = () => {
    return async function (dispatch) {
        try {
            const response = await axios('https://info-farma-backend.onrender.com/productos-generales');
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