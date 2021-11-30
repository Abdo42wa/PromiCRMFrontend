export const materialsWarehouseReducer = (state = {materialsWarehouse: []},action)=>{
    switch(action.payload){
        case 'WAREHOUSE_MATERIALS_FETCH_REQUEST':
            return {...state,loading: true}
        case 'WAREHOUSE_MATERIALS_FETCH_SUCCESS':
            return {...state,loading: false, materialsWarehouse: action.payload}
        case 'WAREHOUSE_MATERIALS_FETCH_FAIL':
            return {...state,loading: false, error: action.payload}
        case 'WAREHOUSE_MATERIALS_CREATE_REQUEST':
            return {...state,loading:true}
        case 'WAREHOUSE_MATERIALS_CREATE_SUCCESS':
            //add obj to materialsWarehouse array
            const newMaterialsWarehouse = [...state.materialsWarehouse, {...action.payload}]
            return {...state,loading:false,materialsWarehouse: newMaterialsWarehouse}
        case 'WAREHOUSE_MATERIALS_CREATE_FAIL':
            return {...state,loading:false,error: action.payload}
        case 'WAREHOUSE_MATERIALS_UPDATE_REQUEST':
            return {...state,loading:true}
        case 'WAREHOUSE_MATERIALS_UPDATE_SUCCESS':
            const materialsWarehouseClone = JSON.parse(JSON.stringify(state.materialsWarehouse));
            materialsWarehouseClone.map((element,index)=>{
                if(element.id === action.payload.id){
                    element.title = action.payload.title;
                    element.measuringUnit = action.payload.measuringUnit;
                    element.quantity = action.payload.quantity;
                    element.info = action.payload.info;
                    element.deliveryTime = action.payload.deliveryTime;
                    element.useDays = action.payload.useDays;
                    element.lastAdittion = action.payload.lastAdittion;
                }
            });
            return {...state, loading:false,materialsWarehouse: materialsWarehouseClone}
        case 'WAREHOUSE_MATERIALS_UPDATE_FAIL':
            return {...state,loading: false, error: action.payload}
        default:
            return state;
    }
}