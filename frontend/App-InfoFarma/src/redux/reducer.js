import { 
    GET_ALL_PRODUCTS,
} from './actions';

const inicialState = {
    allProducts: [],
}

const rootReducer = (state = inicialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts: action.payload,
                products: action.payload
            }

        default:
            return {
                ...state
            }
    }
}

export default rootReducer