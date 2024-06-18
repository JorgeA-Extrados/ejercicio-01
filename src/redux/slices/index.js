// src/slices/index.js
import { combineReducers } from 'redux';
import characterSlice from './characterSlice';


const rootReducer = combineReducers({
    character: characterSlice,
});

export default rootReducer;
