export const warehouseReducer = (state = { warehouseData: [], warehouse_products: [] }, action) => {
    switch (action.type) {
        case 'WAREHOUSES_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'WAREHOUSES_FETCH_SUCCESS':
            return { ...state, loading: false, warehouseData: action.payload }
        case 'WAREHOUSES_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'WAREHOUSES_PRODUCTS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'WAREHOUSES_PRODUCTS_FETCH_SUCCESS':
            return { ...state, loading: false, warehouse_products: action.payload }
        case 'WAREHOUSES_PRODUCTS_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'WAREHOUSES_CREATE_REQUEST':
            return { ...state, loading: true }
        case 'WAREHOUSES_CREATE_SUCCESS':
            // add new object to warehouses array(state)
            const newWarehouses = [...state.warehouseData, { ...action.payload }]
            return { ...state, loading: false, warehouseData: newWarehouses }
        case 'WAREHOUSES_CREATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'WAREHOUSES_CREATE_UPDATE_REQUEST':
            return {...state, loading: true}
        case 'WAREHOUSES_CREATE_UPDATE_SUCCESS':
            // if(action.payload !== null && action.payload !== undefined){
            //     const clone_data = [...state.warehouseData]
            //     const index = clone_data.findIndex(x => x.id === action.payload.id)
            //     //if there is already such item update it
            //     if(index !== -1){
            //         const updated_data = clone_data.map(x => x.id === action.payload.id?action.payload:x)
            //         return {...state, loading: false, warehouseData: updated_data}
            //     }else{
            //         const data_updated = [...clone_data, {...action.payload}]
            //         return {...state, loading: false, warehouseData: data_updated}
            //     }
            // }
            // 
            return {...state, loading: false}
        case 'WAREHOUSES_CREATE_UPDATE_FAIL':
            return {...state, loading: false, error: action.payload}
        case 'WAREHOUSES_UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'WAREHOUSES_UPDATE_SUCCESS':
            const dataClone = [...state.warehouseData];
            const updated = dataClone.map(x => x.id === action.payload.id ? action.payload : x)
            return { ...state, loading: false, warehouseData: updated }
        case 'WAREHOUSES_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'WAREHOUSES_UPDATE_IMAGE_REQUEST':
            return { ...state, loading: true }
        case 'WAREHOUSES_UPDATE_IMAGE_SUCCESS':
            const dataClone1 = [...state.warehouseData];
            const updated_data = dataClone1.map(x => x.id === action.payload.id ? action.payload : x)
            return { ...state, loading: false, warehouseData: updated_data }
        case 'WAREHOUSES_UPDATE_IMAGE_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}