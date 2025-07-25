import { combineReducers } from '@reduxjs/toolkit';
import { shopSlice } from './shop.reducer';

const reducer = combineReducers({
    [shopSlice.name]: shopSlice.reducer,
});

export default reducer;
