export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case 'PRODUCTS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'PRODUCTS_FETCH_SUCCESS':
            return { ...state, loading: false, products: action.payload }
        case 'PRODUCTS_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'PRODUCTS_CREATE_REQUEST':
            return { ...state, loading: true }
        case 'PRODUCTS_CREATE_SUCCESS':

            const newProduct = [...state.products, { ...action.payload }]
            return { ...state, loading: false, products: newProduct }
        case 'PRODUCTS_CREATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'PRODUCTS_UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'PRODUCTS_UPDATE_SUCCESS':
            const cloneProduct = JSON.parse(JSON.stringify(state.products));
            cloneProduct.map((element, index) => {
                if (element.id === action.payload.id) {
                    element.orderId = action.payload.orderId;
                    element.serviceId = action.payload.serviceId;
                    element.photo = action.payload.photo;
                    element.link = action.payload.link;
                    element.code = action.payload.code;
                    element.category = action.payload.category;
                    element.name = action.payload.name;
                    element.lengthWithoutPackaging = action.payload.lengthWithoutPackaging;
                    element.widthWithoutPackaging = action.payload.widthWithoutPackaging;
                    element.heightWithoutPackaging = action.payload.heightWithoutPackaging;
                    element.weightGross = action.payload.weightGross;
                    element.packagingBoxCode = action.payload.packagingBoxCode;
                    element.packingTime = action.payload.packingTime;
                }
            })
            return { ...state, loading: false, products: cloneProduct }
        case 'PRODUCTS_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}