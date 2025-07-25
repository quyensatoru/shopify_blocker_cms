import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../index';

const initialState = {
    loading: false,
    name: '',
    email: '',
    domain: '',
    shopifyPlan: '',
};

export const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {
        setShop: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
    extraReducers: (builder) => {},
});
export const { setShop } = shopSlice.actions;
export const selectShop = (state: RootState) => state.shop;
