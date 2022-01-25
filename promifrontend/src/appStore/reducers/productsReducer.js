export const productsReducer = (state = { products: [], product_materials: [], modified_product_materials: [] }, action) => {
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
            const updated_products = products_clone.map(x => x.id === action.payload.id ? action.payload : x)
            return { ...state, loading: false, products: updated_products }
        case 'PRODUCTS_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'PRODUCTS_IMAGE_UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'PRODUCTS_IMAGE_UPDATE_SUCCESS':
            const products_data = [...state.products]
            const updated_data = products_data.map(x => x.id === action.payload.id ? action.payload : x)
            return { ...state, loading: false, products: updated_data }
        case 'PRODUCTS_IMAGE_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        // PRODUCT MATERIALS ------------------ UPDATE
        // fetch to delete modified_product_materials on load for each product
        case 'MATERIALS_PRODUCT_FETCH_SUCCESS':
            return { ...state, product_materials: action.payload, modified_product_materials: [] }
        //PRODUCTS --- START
        case 'MATERIALS_PRODUCT_ADD_SUCCESS':
            const product_materials = [...state.product_materials, { ...action.payload }]
            const modified_p_materials = [...state.modified_product_materials, { ...action.payload }]
            return { ...state, loading: false, product_materials: product_materials, modified_product_materials: modified_p_materials }
        case 'MATERIALS_PRODUCT_ADD_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'MATERIALS_PRODUCT_UPDATE_SUCCESS':
            const product_materials_clone = [...state.product_materials]
            const m_product_materials = [...state.modified_product_materials]
            const index_p = m_product_materials.findIndex(x => x.id === action.payload.id);
            //if index -1 means there is no item with such id in modified_order_materials. need to add it
            if (index_p === -1) {
                const updated_product_materials = product_materials_clone.map(x => x.id === action.payload.id ? action.payload : x)
                const new_product_materials = [...m_product_materials, { ...action.payload }]
                return { ...state, loading: false, product_materials: updated_product_materials, modified_product_materials: new_product_materials }
            } else {
                const updated_product_materials_s = product_materials_clone.map(x => x.id === action.payload.id ? action.payload : x)
                const update_m_product_materials = m_product_materials.map(x => x.id === action.payload.id ? action.payload : x)
                return { ...state, loading: false, product_materials: updated_product_materials_s, modified_product_materials: update_m_product_materials }
            }
        case 'MATERIALS_PRODUCT_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        //TO DELETE PRODUCT_MATERIAL
        case 'MATERIALS_PRODUCT_DELETE_REQUEST':
            return { ...state, loading: true }
        case 'MATERIALS_PRODUCT_DELETE_SUCCESS':
            const products_data_c = [...state.products]
            //map through products array each item. setting productMaterials to: filtering so it can return 
            //only those elements in productMaterials array that meet condition(their id cant be action.payload)
            const updated_products_d = products_data_c?products_data_c.map(v => ({
                ...v, productMaterials: v.productMaterials.filter(x => x.id !== action.payload) 
            })):[]
            const product_materials_data = state.product_materials.filter(x => x.id !== action.payload)
            const modified_index = state.modified_product_materials.findIndex(x => x.id === action.payload)
            if (modified_index !== -1) {
                const new_m_product_materials = state.modified_product_materials.filter(x => x.id !== action.payload)
                return { ...state, loading: false,products:updated_products_d , product_materials: product_materials_data, modified_product_materials: new_m_product_materials }
            } else {
                return { ...state, loading: false,products:updated_products_d, product_materials: product_materials_data }
            }
        case 'MATERIALS_PRODUCT_DELETE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'PRODUCT_MATERIAL_UPDATE_MANY_REQUEST':
            return {...state, loading: true}
        case 'PRODUCT_MATERIAL_UPDATE_MANY_SUCCESS':
            const product_materials_d_c = [...action.payload]
            const products_d_c = [...state.products]
            const product = products_d_c.find(x => x.id === action.payload[0].productId)
            const obj = {...product,productMaterials: product_materials_d_c}
            const updated_products_d_c = products_d_c?products_d_c.map(v => v.id === obj.id?obj:v):[]
            return {...state, products: updated_products_d_c}
        case 'PRODUCT_MATERIAL_UPDATE_MANY_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}