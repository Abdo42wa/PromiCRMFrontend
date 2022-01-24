export const salesChannelsReducer = (state = {salesChannels: []},action)=>{
    switch(action.type){
        case 'SALES_CHANNELS_FETCH_REQUEST':
            return {...state, loading: true}
        case 'SALES_CHANNELS_FETCH_SUCCESS':
            return {...state, loading: false, salesChannels: action.payload}
        case 'SALES_CHANNELS_FETCH_FAIL':
            return {...state,loading:false,error: action.payload}
        case 'SALES_CHANNELS_CREATE_REQUEST':
            return {...state,loading:true}
        case 'SALES_CHANNELS_CREATE_SUCCESS':
            // adding new obj to salesChannels array(state)
            const newSalesChannels = [...state.salesChannels, {...action.payload}]
            return {...state, loading: false, salesChannels: newSalesChannels}
        case 'SALES_CHANNELS_CREATE_FAIL':
            return {...state,loading:false,error:action.payload}
        case 'SALES_CHANNELS_UPDATE_REQUEST':
            return {...state, loading: true }
        case 'SALES_CHANNELS_UPDATE_SUCCESS':
            const channels_clone = [...state.salesChannels]
            const updated_channels = channels_clone.map(x => x.id === action.payload.id?action.payload:x)
            return {...state, loading: false, salesChannels: updated_channels}
        case 'SALES_CHANNELS_UPDATE_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}