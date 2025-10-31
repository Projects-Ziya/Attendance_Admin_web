
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apiSlice";
import { adminApiSlice } from '../slices/adminApiSlices'

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [adminApiSlice.reducerPath]: adminApiSlice.reducer, 
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(apiSlice.middleware, adminApiSlice.middleware), 
    devTools: true
});

export default store;
