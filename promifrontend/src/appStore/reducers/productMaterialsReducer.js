export const productMaterialsReducer = (state = { materials: [], order_materials: [], modified_order_materials: [] }, action) => {
    switch (action.type) {
        case 'MATERIALS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'MATERIALS_FETCH_SUCCESS':
            return { ...state, loading: false, materials: action.payload }
        case 'MATERIALS_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
            // TO GET ORDER MATERIALS
        case 'MATERIALS_ORDER_FETCH_REQUEST':
            return {...state, loading: true}
        case 'MATERIALS_ORDER_FETCH_SUCCESS':
            return {...state, loading: false, order_materials: action.payload}
        case 'MATERIALS_ORDER_FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
            //TO ADD MATERIAL TO order_materials array. later i can save it
        case 'MATERIALS_ORDER_ADD_SUCCESS':
            const order_materials = [...state.order_materials, {...action.payload}]
            const modified_materials = [...state.modified_order_materials, {...action.payload}]
            return {...state, loading: false, order_materials: order_materials, modified_order_materials: modified_materials}
        case 'MATERIALS_ORDER_ADD_FAIL':
            return {...state, loading: false, error: action.payload}
            // TO UPDATE ORDER MATERIALS
        case 'MATERIALS_ORDER_UPDATE_SUCCESS':
            const order_materials_clone = [...state.order_materials]
            const m_order_materials = [...state.modified_order_materials]
            const index = m_order_materials.findIndex(x => x.id === action.payload.id);
            //if index -1 means there is no item with such id in modified_order_materials. need to add it
            if(index === -1){
                const updated_order_materials = order_materials_clone.map(x => x.id === action.payload.id?action.payload:x)
                const new_order_materials = [...m_order_materials,{...action.payload}]
                return {...state, loading: false, order_materials: updated_order_materials, modified_order_materials: new_order_materials}
            }else{
                const updated_order_materials_s = order_materials_clone.map(x => x.id === action.payload.id?action.payload:x)
                const update_m_order_materials =    m_order_materials.map(x => x.id === action.payload.id?action.payload:x)
                return {...state, loading: false, order_materials: updated_order_materials_s, modified_order_materials: update_m_order_materials}
            }
        case 'MATERIALS_ORDER_UPDATE_FAIL':
            return {...state, loading: false, error:action.payload}
        //TO DELETE ORDER_MATERIAL
        case 'MATERIALS_ORDER_DELETE_REQUEST':
            return {...state, loading: true}
        case 'MATERIALS_ORDER_DELETE_SUCCESS':
            const order_materials_data = state.order_materials.filter(x => x.id !== action.payload)
            return {...state, loading: false, order_materials: order_materials_data}
        case 'MATERIALS_ORDER_DELETE_FAIL':
            return {...state, loading: false, error: action.payload}
        case 'MATERIALS_PRODUCT_FETCH_REQUEST':
            return {...state, loading: true}
        case 'MATERIALS_PRODUCT_FETCH_SUCCESS':
            return {...state, loading: false, materials: action.payload}
        case 'MATERIALS_PRODUCT_FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
        case 'MATERIALS_CREATE_REQUEST':
            return { ...state, loading: true }
        case 'MATERIALS_CREATE_SUCCESS':
            // add new object to materials state(array)
            const newMaterials = [...state.materials, { ...action.payload }]
            return { ...state, loading: true, materials: newMaterials }
        case 'MATERIALS_CREATE_FAIL':
            return { ...state, loading: false, error: action.payload }
        case 'MATERIAL_UPDATE_REQUEST':
            return {...state, loading: true}
        case 'MATERIAL_UPDATE_SUCCESS':
            const materials_clone = [...state.materials]
            const updated_materials = materials_clone.map(x => x.id === action.payload.id?action.payload:x)
            return {...state, loading: false, materials: updated_materials}
        case 'MATERIAL_UPDATE_FAIL':
            return {...state, loading: false, error: action.payload}
        case 'ORDER_MATERIAL_UPDATE_MANY_REQUEST':
            return {...state,loading: true}
        case 'ORDER_MATERIAL_UPDATE_MANY_SUCCESS':
            return {...state,loading: false,modified_order_materials: [] }
        case 'ORDER_MATERIAL_UPDATE_MANY_FAIL':
            return {...state, loading: false, error:action.payload}
        default:
            return state;
    }
}