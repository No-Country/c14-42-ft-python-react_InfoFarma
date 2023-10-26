import { 
    GET_ALL_PRODUCTS,
    FILTER_BY_ALPHABETIC,
    ORDER_BY
} from './actions';

const inicialState = {
    allProducts: [],
    products: [], // para no pisar el estado allProducts creo el estado products para trabajar sobre él en los demas estados globales
    productsFiltered: [],
}

const rootReducer = (state = inicialState, action) => {
    switch (action.type) {
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                allProducts: action.payload,
                products: action.payload
            }

        case FILTER_BY_ALPHABETIC:
            {console.log(action.payload)}
            let value = action.payload;
            
            let productsFiltered = state.products.filter(product => product.name[0].toLowerCase() === value.toLowerCase());
            return {
                ...state,
                productsFiltered: productsFiltered,
            };  
            
            
        case ORDER_BY:
            let orderBy = [...state.productsFiltered];
            orderBy = orderBy.sort((a, b) => {
                switch (action.payload) {    
                    case 1:
                        if (a.min_price < b.min_price) return -1
                        if (a.min_price > b.min_price) return 1                
                        return 0

                    case 2:
                        if (a.max_price > b.max_price) return -1
                        if (a.max_price < b.max_price) return 1
                        return 0
    
                    default:
                        return {...state}
                    }
                })
    
                return {
                    ...state,
                    productsFiltered: orderBy
                }

        default:
            return {
                ...state
            }
    }
}

export default rootReducer