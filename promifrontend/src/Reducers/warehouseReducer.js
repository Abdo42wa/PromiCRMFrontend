export const warehouseReducer = (state = {warehouses: []}, action)=>{
    switch(action.type){
        case 'WAREHOUSES_FETCH_REQUEST':
            return {...state, loading: true}
        case 'WAREHOUSES_FETCH_SUCCESS':
            return {...state,loading: false, warehouses: action.payload}
        case 'WAREHOUSES_FETCH_FAIL':
            return {...state,loading:false, error: action.payload}
        case 'WAREHOUSES_CREATE_REQUEST':
            return {...state, loading: true}
        case 'WAREHOUSES_CREATE_SUCCESS':
            // add new object to warehouses array(state)
            const newWarehouses = [...state.warehouses, {...action.payload}]
            return {...state, loading: false, warehouses: newWarehouses}
        case 'WAREHOUSES_UPDATE_REQUEST':
            return {...state, loading: true}
        case 'WAREHOUSES_UPDATE_SUCCESS':
            const warehousesClone = JSON.parse(JSON.stringify(state.warehouses));
            warehousesClone.map((element,index)=>{
                if(element.id === action.payload.id){
                    element.quantityProductWarehouse = action.payload.quantityProductWarehouse;
                    element.photo = action.payload.photo;
                    element.lastTimeChanging = action.payload.lastTimeChanging;
                    element.orderId = action.payload.orderId;
                }
            });
            return {...state, loading: false, warehouses: warehousesClone}
        case 'WAREHOUSES_UPDATE_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}