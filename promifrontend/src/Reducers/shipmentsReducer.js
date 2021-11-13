export const shipmentsReducer = (state= {shipments: []}, action)=>{
    switch(action.type){
        case 'SHIPMENTS_FETCH_REQUEST':
            return {...state,loading: true}
        case 'SHIPMENTS_FETCH_SUCCESS':
            return {...state, loading: false, shipments: action.payload}
        case 'SHIPMENTS_FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
        case 'SHIPMENTS_CREATE_REQUEST':
            return {...state, loading: true}
        case 'SHIPMENTS_CREATE_SUCCESS':
            // add new object to shipments array(state)
            const newShipments = [...state.shipments, {...action.payload}]
            return {...state, loading: false, shipments: newShipments}
        case 'SHIPMENT_UPDATE_REQUEST':
            return {...state, loading: true}
        case 'SHIPMENT_UPDATE_SUCCESS':
            const shipmentsClone = JSON.parse(JSON.stringify(state.shipments));
            // find item with same id. changes its all values to action.payload values
            shipmentsClone.map((element,index)=>{
                if(element.id === action.payload.id){
                    element.type = action.payload.type;
                    element.period = action.payload.period;
                    element.shippingCost = action.payload.shippingCost;
                    element.shippingNumber = action.payload.shippingNumber;
                    element.shipmentInfo = action.payload.shipmentInfo;
                }
            });
            return {...state, loading: false, shipments: shipmentsClone}
        case 'SHIPMENT_UPDATE_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}