export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case 'PRODUCTS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'PRODUCTS_FETCH_SUCCESS':
            return { ...state, loading: false, products: action.payload }
        case 'PRODUCTS_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'PRODUCTS_BY_ORDER_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'PRODUCTS_BY_ORDER_FETCH_SUCCESS':
            return { ...state, loading: false, products: action.payload }
        case 'PRODUCTS_BY_ORDER_FETCH_FAIL':
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
            const products_clone = [...state.products];
            const updated_products = products_clone.map(x => x.id === action.payload.id?action.payload:x)
            return { ...state, loading: false, products: updated_products }
        case 'PRODUCTS_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'PRODUCTS_IMAGE_UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'PRODUCTS_IMAGE_UPDATE_SUCCESS':
            const products_data = [...state.products]
            const updated_data = products_data.map(x => x.id === action.payload.id?action.payload:x)
            return { ...state, loading: false, products: updated_data}
        case 'PRODUCTS_IMAGE_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'PRODUCT_MATERIAL_UPDATE_MANY_REQUEST':
            return { ...state, loading: true }
        case 'PRODUCT_MATERIAL_UPDATE_MANY_SUCCESS':
            const cloneProducts = JSON.parse(JSON.stringify(state.products));
            const updatedMaterials = action.payload
            cloneProducts.forEach(element => {
                if (element.id === updatedMaterials[0].productId) {
                    updatedMaterials.forEach(element1 => {
                        element.productMaterials.forEach(obj => {
                            if (obj.id === element1.id) {
                                obj.productId = element1.productId;
                                obj.materialWarehouseId = element1.materialWarehouseId;
                                obj.quantity = element1.quantity
                            }
                        })
                    })
                }
            })

            return { ...state, loading: false, products: cloneProducts }
        case 'PRODUCT_MATERIAL_UPDATE_MANY_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'PRODUCT_MATERIAL_INSERT_MANY_REQUEST':
            return { ...state, loading: true }
        case 'PRODUCT_MATERIAL_INSERT_MANY_SUCCESS':
            const cloneOfProducts = JSON.parse(JSON.stringify(state.products));
            const returnedProductMaterials = action.payload
            cloneOfProducts.forEach(element => {
                if (element.id === returnedProductMaterials[0].productId) {
                    element.productMaterials = returnedProductMaterials;
                }
            })

            return { ...state, loading: false, products: cloneOfProducts }
        case 'PRODUCT_MATERIAL_INSERT_MANY_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}