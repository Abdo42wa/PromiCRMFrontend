export const productMaterialsReducer = (state = { materials: [] }, action) => {
    switch (action.type) {
        case 'MATERIALS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'MATERIALS_FETCH_SUCCESS':
            return { ...state, loading: false, materials: action.payload }
        case 'MATERIALS_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
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
        case 'MATERIAL_UPDATE_MANY_REQUEST':
            return {...state,loading: true}
        case 'MATERIAL_UPDATE_MANY_SUCCESS':
            const cloneMaterials = JSON.parse(JSON.stringify(state.materials));
            const actionClone = JSON.parse(JSON.stringify(action.payload))
            actionClone.map((element,index)=>{
                cloneMaterials.map((obj,index2)=>{
                    if(obj.id === element.id){
                        obj.productId = element.productId;
                        obj.materialWarehouseId = element.materialWarehouseId
                    }
                })
            })
            return {...state,loading: false, materials: cloneMaterials}
        case 'MATERIAL_UPDATE_MANY_FAIL':
            return {...state, loading: false, error:action.payload}
        default:
            return state;
    }
}