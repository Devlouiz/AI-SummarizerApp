import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "./article";
import { thunk } from "redux-thunk";

export const store = configureStore({
    reducer:{[articleApi.reducerPath]: articleApi.reducer},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware)
})