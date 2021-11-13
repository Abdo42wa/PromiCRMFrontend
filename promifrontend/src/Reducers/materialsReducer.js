export const materialsReducer = (state = { materials: [] }, action) => {
    switch (action.type) {
        case 'MATERIALS_FETCH_REQUEST':
            return { ...state, loading: true }
        case 'MATERIALS_FETCH_SUCCESS':
            return { ...state, loading: false, materials: action.payload }
        case 'MATERIALS_FETCH_FAIL':
            return { ...state, loading: false, error: action.payload }
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
            const materialsClone = JSON.parse(JSON.stringify(state.materials));
            materialsClone.map((element, index)=>{
                if(element.id === action.payload.id){
                    element.name = action.payload.name;
                    element.materialUser = action.payload.materialUsed;
                    element.productId = action.payload.productId;
                }
            })
            return {...state, loading: false, materials: materialsClone}
        case 'MATERIAL_UPDATE_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state;
    }
}