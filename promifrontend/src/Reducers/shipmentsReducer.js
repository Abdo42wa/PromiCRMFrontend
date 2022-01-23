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
            const shipments_clone = [...state.shipments];
            const updated_shipments = shipments_clone.map(x => x.id === action.payload.id?action.payload:x)
            return {...state, loading: false, shipments: updated_shipments}
        case 'SHIPMENT_UPDATE_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}