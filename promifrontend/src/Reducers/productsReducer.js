export const productsReducer = (state = {products: []}, action) =>{
    switch(action.type){
        case 'PRODUCTS_FETCH_REQUEST':
            return {...state, loading: true}
        case 'PRODUCTS_FETCH_SUCCESS':
            return {...state, loading: false, products: action.payload}
        case 'PRODUCTS_FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
        default: 
            return state;
    }
}