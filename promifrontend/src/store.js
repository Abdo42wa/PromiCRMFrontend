import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
//import { userLoginReducer, userRegisterReducer, userDataReducer } from './Reducers/userReducer';
import { usersReducer } from './Reducers/userReducer';
import { usersListReducer } from './Reducers/userListReducer';


const allReducers = combineReducers({
    usersReducer,
    usersListReducer
});


const userInfoFromStorage = localStorage.getItem('currentUser')?localStorage.getItem('currentUser'):null;
const initialState = {
    usersReducer: { currentUser: userInfoFromStorage },
}

const middleware = [thunk];

const store = createStore(allReducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;