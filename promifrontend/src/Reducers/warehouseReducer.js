export const warehouseReducer = (state = { warehouseData: [] }, action) => {
    switch (action.type) {
        case 'WAREHOUSES_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'WAREHOUSES_FETCH_SUCCESS':
            return { ...state, loading: false, warehouseData: action.payload }
        case 'WAREHOUSES_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'WAREHOUSES_CREATE_REQUEST':
            return { ...state, loading: true }
        case 'WAREHOUSES_CREATE_SUCCESS':
            // add new object to warehouses array(state)
            const newWarehouses = [...state.warehouseData, { ...action.payload }]
            return { ...state, loading: false, warehouseData: newWarehouses }
        case 'WAREHOUSES_UPDATE_REQUEST':
            return { ...state, loading: true }
        case 'WAREHOUSES_UPDATE_SUCCESS':
            const warehousesClone = JSON.parse(JSON.stringify(state.warehouseData));
            warehousesClone.map((element, index) => {
                if (element.id === action.payload.id) {
                    element.quantityProductWarehouse = action.payload.quantityProductWarehouse;
                    element.photo = action.payload.photo;
                    element.lastTimeChanging = action.payload.lastTimeChanging;
                    element.orderId = action.payload.orderId;
                    element.imageName = action.payload.imageName;
                    element.imagePath = action.payload.imagePath;
                }
            });
            return { ...state, loading: false, warehouseData: warehousesClone }
        case 'WAREHOUSES_UPDATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'WAREHOUSES_UPDATE_IMAGE_REQUEST':
            return { ...state, loading: true }
        case 'WAREHOUSES_UPDATE_IMAGE_SUCCESS':
            const clone = JSON.parse(JSON.stringify(state.warehouseData));
            clone.map((element, index) => {
                if (element.id === action.payload.id) {
                    element.quantityProductWarehouse = action.payload.quantityProductWarehouse;
                    element.photo = action.payload.photo;
                    element.lastTimeChanging = action.payload.lastTimeChanging;
                    element.orderId = action.payload.orderId;
                    element.imageName = action.payload.imageName;
                    element.imagePath = action.payload.imagePath;
                }
            });
            return { ...state, loading: false, warehouseData: clone }
        case 'WAREHOUSES_UPDATE_IMAGE_FAIL':
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}