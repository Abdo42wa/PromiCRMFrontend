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
                    element.imageName = action.payload.imageName;
                    element.imagePath = action.payload.imagePath;
                }
            })
            return { ...state, loading: false, products: cloneProduct }
        case 'PRODUCTS_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'PRODUCTS_IMAGE_UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'PRODUCTS_IMAGE_UPDATE_SUCCESS':
            const productsClone = JSON.parse(JSON.stringify(state.products));
            productsClone.map((element, index) => {
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
                    element.imageName = action.payload.imageName;
                    element.imagePath = action.payload.imagePath;
                }
            })
            return { ...state, loading: false, products: productsClone }
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